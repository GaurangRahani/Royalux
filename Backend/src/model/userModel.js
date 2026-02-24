import mongoose, { Schema } from "mongoose";

const bankDetailsSchema = new Schema(
  {
    accountHolderName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    ifscCode: {
      type: String,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const documentsSchema = new Schema(
  {
    aadhaarFront: {
      type: String,
      trim: true,
    },
    aadhaarBack: {
      type: String,
      trim: true,
    },
    panCard: {
      type: String,
      trim: true,
    },
    reraLicense: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const agentProfileSchema = new Schema(
  {
    address: {
      type: String,
      trim: true,
    },
    bankDetails: {
      type: bankDetailsSchema,
      default: undefined,
    },
    documents: {
      type: documentsSchema,
      default: undefined,
    },
  },
  { _id: false },
);

const agentSubscriptionSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["NONE", "ACTIVE", "EXPIRED"],
      default: "NONE",
    },
    plan: {
      type: String,
      trim: true,
    },
    validTill: {
      type: Date,
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    profilePic: {
      type: String,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    canListForOthers: {
      type: Boolean,
      default: false,
    },
    agentApplicationStatus: {
      type: String,
      enum: ["NONE", "PENDING", "APPROVED", "REJECTED"],
      default: "NONE",
    },
    agentSubscription: {
      type: agentSubscriptionSchema,
      default: undefined,
    },
    agentProfile: {
      type: agentProfileSchema,
      default: undefined,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// Hash password before saving
import bcrypt from "bcrypt";
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to get data without sensitive fields
userSchema.methods.getData = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const UserModel = mongoose.model("user", userSchema);

export { UserModel };

