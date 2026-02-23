import mongoose from "mongoose";
import { DB_ATLAS } from "../config/config.js";
import { UserModel } from "../model/user.model.js";
import { PropertyModel } from "../model/property.model.js";

async function migrateAgentToUser() {
  if (!DB_ATLAS) {
    throw new Error("Missing DB_ATLAS in environment");
  }

  await mongoose.connect(DB_ATLAS, { dbName: "Royalux" });
  const session = await mongoose.startSession();

  try {
    let totalAgents = 0;
    let createdUsers = 0;
    let updatedUsers = 0;
    let linkedProperties = 0;

    await session.withTransaction(async () => {
      const agentCollection = mongoose.connection.collection("agents");
      const agents = await agentCollection.find({}).toArray();
      totalAgents = agents.length;

      for (const agent of agents) {
        const email = agent.email?.toLowerCase()?.trim();
        if (!email) {
          continue;
        }

        const existingUser = await UserModel.findOne({ email }).select("_id").session(session);

        const userPayload = {
          name: agent.name,
          email,
          mobileNo: agent.mobileNo ?? undefined,
          // Preserve already-hashed password from Agent collection.
          password: agent.password,
          role: "USER",
          canListForOthers: true,
          agentApplicationStatus: "APPROVED",
          agentProfile: {
            age: agent.age ?? undefined,
            gender: agent.gender ?? undefined,
            city: agent.city ?? undefined,
            state: agent.state ?? undefined,
            address: agent.address ?? undefined,
            bankDetails: {
              bankName: agent.bankName ?? undefined,
              accountNo: agent.bankAccountNo ?? undefined,
              ifsc: agent.ifscCode ?? undefined,
            },
            documents: {
              aadhaarFront: agent.adharCardFront ?? undefined,
              aadhaarBack: agent.adharCardBack ?? undefined,
              panCard: agent.panCard ?? undefined,
            },
          },
        };

        const user = await UserModel.findOneAndUpdate(
          { email },
          {
            $setOnInsert: userPayload,
            $set: {
              canListForOthers: true,
              agentApplicationStatus: "APPROVED",
              agentProfile: userPayload.agentProfile,
            },
          },
          {
            upsert: true,
            new: true,
            session,
          }
        ).select("_id");

        if (existingUser) {
          updatedUsers += 1;
        } else {
          createdUsers += 1;
        }

        const updateResult = await PropertyModel.updateMany(
          { agentId: agent._id },
          {
            $set: {
              agentId: user._id,
              ownerType: "OFFLINE",
            },
          },
          { session }
        );

        linkedProperties += updateResult.modifiedCount ?? 0;
      }
    });

    console.log("Migration completed successfully.");
    console.log(`Agents scanned: ${totalAgents}`);
    console.log(`Users created: ${createdUsers}`);
    console.log(`Users updated: ${updatedUsers}`);
    console.log(`Properties re-linked: ${linkedProperties}`);
    console.log(
      "Manual step pending: after verification, AgentModel usage and the agents collection can be removed."
    );
  } finally {
    session.endSession();
    await mongoose.disconnect();
  }
}

migrateAgentToUser().catch((error) => {
  console.error("Migration failed:", error);
  process.exitCode = 1;
});
