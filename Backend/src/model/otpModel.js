import mongoose, { Schema } from "mongoose";
import validator from "validator";

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Validation Error");
      }
    },
  },
  otp: {
    type: String,
    trim: true,
  },
  //temporary storage for signup data until OTP is verified
  name: {
    type: String,
    trim: true,
  },
  mobileNo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, //recorad wil automatically delete after 10 minutes of creation
  },
});

const OtpModel = mongoose.model("otp", otpSchema);

export { OtpModel };
