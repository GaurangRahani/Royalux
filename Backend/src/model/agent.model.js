import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Define the schema for the Agent model
const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      trim: true,
      default: null,
    },
    publicUrl: {
      type: String,
      default: null,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "AGENT",
    },
    age: {
      // Changed from String to Number for better data consistency
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender is not correct",
      },
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    bankAccountNo: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
    },
    adharCardFront: {
      type: String,
      required: true,
      trim: true,
    },
    adharCardBack: {
      type: String,
      required: true,
      trim: true,
    },
    panCard: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["approval", "cancel", "pending"],
        message: "Plz ! Select One..!",
      },
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now(),
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Pre-save hook to hash the password before saving to the database
agentSchema.pre("save", async function (next) {
  // Only hash if the password field is modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Use async version for better performance
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Instance method to compare a provided password with the hashed password
agentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the Mongoose model
const AgentModel = mongoose.model("agent", agentSchema);

export { AgentModel };