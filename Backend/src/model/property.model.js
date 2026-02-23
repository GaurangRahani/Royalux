import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ownerType: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["SELL", "RENT"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    propertyImages: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    propertyAge: {
      type: Number,
      required: true,
    },

    // Classification of propertyy
    propertyType: {
      type: String,
      enum: ["APARTMENT", "VILLA", "INDEPENDENT_HOUSE", "COMMERCIAL"],
      required: true,
    },
    houseType: {
      type: String,
      enum: ["1_BHK", "2_BHK", "3_BHK", "3_PLUS_BHK"],
      required: true,
    },
    facing: {
      type: String,
      enum: ["NORTH", "EAST", "SOUTH", "WEST"],
      required: true,
    },
    furnishing: {
      type: String,
      enum: ["UNFURNISHED", "SEMI_FURNISHED", "FULLY_FURNISHED"],
      required: true,
    },
    facilities: {
      type: [String],
      default: [],
    },

    // status of property
    status: {
      type: String,
      enum: [
        "PENDING_ADMIN_APPROVAL",
        "ACTIVE",
        "VISIT_COMPLETED",
        "SOLD",
        "RENTED",
        "CANCELLED",
        "ARCHIVED",
      ],
      default: "PENDING_ADMIN_APPROVAL",
      index: true,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PropertyModel = mongoose.model("property", propertySchema);

export { PropertyModel };
