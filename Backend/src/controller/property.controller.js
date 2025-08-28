import { PropertyModel } from "../model/property.model.js";
import { UserModel } from "../model/user.model.js";
import { AgentModel } from "../model/agent.model.js";
import { fileUploadInCloudinary } from "../utils/clodinary.js";
import { Message } from "../config/message.js";
const { propertyMessage, errorMessage } = Message;

/**
 * @desc Add a new property
 * @route POST /api/property/add
 * @access Private (User/Agent only)
 */
export const addProperty = async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;

    // Validate user data and file upload
    if (user.email !== data.email && user.mobileNo !== data.mobileNo) {
      return res.status(400).json({
        success: false,
        message: errorMessage.InvalidData,
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: errorMessage.InvalidData,
      });
    }

    // Upload multiple property images to Cloudinary concurrently
    const uploadPromises = req.files.map((file) => fileUploadInCloudinary(file.path));
    const uploadResults = await Promise.all(uploadPromises);
    const propertyImages = uploadResults.map((result) => result.secure_url);

    // Prepare facility data from a comma-separated string
    data.facility = data.facility.split(",").map(item => item.trim());

    // Create a new property document
    const propertyData = new PropertyModel({
      ...data,
      propertyImage: propertyImages,
      userId: user._id, // Assign the property to the current user
    });

    await propertyData.save();

    return res.status(201).json({
      success: true,
      propertyData,
      message: propertyMessage.AddProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while adding the property.",
    });
  }
};

/**
 * @desc Get all properties (Admin only)
 * @route GET /api/property/all
 * @access Private (Admin only)
 */
export const getAllProperty = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const allProperty = await PropertyModel.find({});
    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching properties.",
    });
  }
};

/**
 * @desc Get properties by their status for admin
 * @route GET /api/property/select/:key
 * @access Private (Admin only)
 */
export const getAllSelectedProperty = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const status = req.params.key;
    let allProperty;

    switch (status) {
      case "All":
        allProperty = await PropertyModel.find();
        break;
      case "Rejected":
        allProperty = await PropertyModel.find({ status: "cancel" });
        break;
      case "Pending":
        allProperty = await PropertyModel.find({ status: "pending" });
        break;
      case "Approved":
        allProperty = await PropertyModel.find({ status: "approval" });
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid status key provided.",
        });
    }

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching selected properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching properties.",
    });
  }
};

/**
 * @desc Get properties by their status for a specific user
 * @route GET /api/property/select/user/:key
 * @access Private (User/Agent only)
 */
export const getAllSelectedPropertyUser = async (req, res) => {
  try {
    const user = req.user;
    const status = req.params.key;
    let allProperty;
    
    const query = { userId: user._id };
    
    if (status !== "All") {
      query.status = status.toLowerCase(); // Ensure status is lowercase
    }

    allProperty = await PropertyModel.find(query);

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching user's properties by status:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all properties of a specific user
 * @route GET /api/property/user/all
 * @access Private (User/Agent only)
 */
export const getUserAllProperty = async (req, res) => {
  try {
    const user = req.user;

    const propertyData = await PropertyModel.find({ userId: user._id });
    if (!propertyData || propertyData.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      propertyData,
      message: propertyMessage.GetUserAllProperty,
    });
  } catch (error) {
    console.error("Error fetching user's properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all pending properties of a specific user
 * @route GET /api/property/user/pending
 * @access Private (User/Agent only)
 */
export const getUserPendingProperty = async (req, res) => {
  try {
    const user = req.user;

    const propertyData = await PropertyModel.find({
      userId: user._id,
      status: "pending",
    });

    if (!propertyData || propertyData.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      propertyData,
      message: propertyMessage.GetUserPendingProperty,
    });
  } catch (error) {
    console.error("Error fetching user's pending properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all approved properties of a specific user
 * @route GET /api/property/user/approval
 * @access Private (User/Agent only)
 */
export const getUserApprovalProperty = async (req, res) => {
  try {
    const user = req.user;

    const propertyData = await PropertyModel.find({
      userId: user._id,
      status: "approval",
    });

    if (!propertyData || propertyData.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      propertyData,
      message: propertyMessage.GetUserApprovalProperty,
    });
  } catch (error) {
    console.error("Error fetching user's approved properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all canceled properties of a specific user
 * @route GET /api/property/user/cancel
 * @access Private (User/Agent only)
 */
export const getUserCancleProperty = async (req, res) => {
  try {
    const user = req.user;

    const propertyData = await PropertyModel.find({
      userId: user._id,
      status: "cancel",
    });

    if (!propertyData || propertyData.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      propertyData,
      message: propertyMessage.GetUserCancelProperty,
    });
  } catch (error) {
    console.error("Error fetching user's canceled properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all properties for the frontend application (no user required)
 * @route GET /api/property/all-for-app
 * @access Public
 */
export const getAllPropertyForApp = async (_, res) => {
  try {
    const allProperty = await PropertyModel.find({});
    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching properties for app:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get only approved properties for sale
 * @route GET /api/property/sell
 * @access Public
 */
export const getOnlySellProperty = async (req, res) => {
  try {
    const allProperty = await PropertyModel.find({
      type: "Sell",
      status: "approval",
    })
      .populate({
        path: "agentId",
        model: "agent",
        select: "name email mobileNo profilePic city state address status",
      })
      .exec();

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetOnlySellProperty,
    });
  } catch (error) {
    console.error("Error fetching 'Sell' properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get only approved properties for rent
 * @route GET /api/property/rent
 * @access Public
 */
export const getOnlyRentProperty = async (req, res) => {
  try {
    const allProperty = await PropertyModel.find({
      type: "Rent",
      status: "approval",
    })
      .populate({
        path: "agentId",
        model: "agent",
        select: "name email mobileNo profilePic city state address status",
      })
      .exec();

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetOnlyRentProperty,
    });
  } catch (error) {
    console.error("Error fetching 'Rent' properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Approve a property (Admin only)
 * @route PUT /api/property/approve
 * @access Private (Admin only)
 */
export const setApproveProperty = async (req, res) => {
  try {
    const admin = req.user;
    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantChange,
      });
    }

    const { id } = req.body;

    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    if (property.status === "approval") {
      return res.status(400).json({
        success: false,
        message: errorMessage.StatusAllReadyApproval,
      });
    }

    property.status = "approval";
    await property.save();

    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.SetApproveProperty,
    });
  } catch (error) {
    console.error("Error approving property:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Cancel a property (Admin only)
 * @route PUT /api/property/cancel
 * @access Private (Admin only)
 */
export const setCancelProperty = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantChange,
      });
    }

    const { id } = req.body;

    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    property.status = "cancel";
    await property.save();

    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.SetCancelProperty,
    });
  } catch (error) {
    console.error("Error canceling property:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get total count of approved properties
 * @route GET /api/property/count/total
 * @access Private (Admin only)
 */
export const totalPropertyCount = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSeeTotal,
      });
    }

    const count = await PropertyModel.countDocuments({ status: "approval" });
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      property: count,
      message: propertyMessage.TotalProperty,
    });
  } catch (error) {
    console.error("Error fetching total property count:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get total count of approved properties for rent
 * @route GET /api/property/count/rent
 * @access Private (Admin only)
 */
export const totalRentPropertyCount = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSeeTotal,
      });
    }

    const count = await PropertyModel.countDocuments({
      type: "Rent",
      status: "approval",
    });
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      property: count,
      message: propertyMessage.TotalRentProperty,
    });
  } catch (error) {
    console.error("Error fetching total rent property count:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get total count of approved properties for sale
 * @route GET /api/property/count/sell
 * @access Private (Admin only)
 */
export const totalSellPropertyCount = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSeeTotal,
      });
    }

    const count = await PropertyModel.countDocuments({
      type: "Sell",
      status: "approval",
    });
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      property: count,
      message: propertyMessage.TotalSellProperty,
    });
  } catch (error) {
    console.error("Error fetching total sell property count:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all approved properties for admin view
 * @route GET /api/property/all-admin
 * @access Private (Admin only)
 */
export const getAllPropertyForAdmin = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const allProperty = await PropertyModel.find({
      status: "approval",
    }).populate({ path: "userId", model: "user", select: "name" });
    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching properties for admin:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get approved 'Sell' properties for admin view
 * @route GET /api/property/sell-admin
 * @access Private (Admin only)
 */
export const getOnlySellPropertyForAdmin = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const allProperty = await PropertyModel.find({
      type: "Sell",
      status: "approval",
    }).populate({ path: "userId", model: "user", select: "name" });

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetOnlySellProperty,
    });
  } catch (error) {
    console.error("Error fetching sell properties for admin:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get approved 'Rent' properties for admin view
 * @route GET /api/property/rent-admin
 * @access Private (Admin only)
 */
export const getOnlyRentPropertyForAdmin = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const allProperty = await PropertyModel.find({
      type: "Rent",
      status: "approval",
    }).populate({ path: "userId", model: "user", select: "name" });

    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetOnlyRentProperty,
    });
  } catch (error) {
    console.error("Error fetching rent properties for admin:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Filter properties based on various criteria
 * @route GET /api/property/filter
 * @access Public
 */
export const getFilterProperty = async (req, res) => {
  try {
    const data = req.query;
    const { city, price, square_feet_start, square_feet_end, property_type, bhk } = data;

    const filter = {};
    if (city) filter.city = city;
    if (price) filter.price = { $lte: price };
    if (square_feet_start && square_feet_end) {
      filter.size = { $gte: square_feet_start, $lte: square_feet_end };
    }
    if (property_type) filter.propertyType = property_type;
    if (bhk) filter.houseType = bhk;

    const property = await PropertyModel.find(filter);

    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error filtering properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while filtering properties.",
    });
  }
};

/**
 * @desc Get the 10 most recently added properties
 * @route GET /api/property/recent
 * @access Private (Admin only)
 */
export const getRecentProperty = async (req, res) => {
  try {
    const admin = req.user;
    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const recentProperty = await PropertyModel.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    if (!recentProperty || recentProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }

    return res.status(200).json({
      success: true,
      recentProperty,
      message: propertyMessage.GetRecentProperty,
    });
  } catch (error) {
    console.error("Error fetching recent properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Add or remove a like from a property
 * @route PUT /api/property/like
 * @access Private (User/Agent only)
 */
export const addLikeInProperty = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.AdminCantChange,
      });
    }

    const { id, isLike } = req.body;

    const property = await PropertyModel.findByIdAndUpdate(
      id,
      { isLike },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.UpdateLike,
    });
  } catch (error) {
    console.error("Error liking/unliking property:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all liked properties of a user
 * @route GET /api/property/like
 * @access Private (User/Agent only)
 */
export const getLikeProperty = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.AdminCantSee,
      });
    }

    const property = await PropertyModel.find({ isLike: true });
    if (!property || property.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.GetLikeProperty,
    });
  } catch (error) {
    console.error("Error fetching liked properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Add payment status to a property
 * @route PUT /api/property/payment
 * @access Private (User/Agent only)
 */
export const addPaymentInProperty = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.AdminCantChange,
      });
    }

    const { id, isPayment } = req.body;

    const property = await PropertyModel.findByIdAndUpdate(
      id,
      { isPayment, paymentUserId: user._id },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      property,
      message: propertyMessage.UpdatePayment,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all approved properties for the app, populated with agent details
 * @route GET /api/property/approval-for-app
 * @access Public
 */
export const getAllApprovalPropertyForApp = async (req, res) => {
  try {
    const allProperty = await PropertyModel.find({ status: "approval" })
      .populate({
        path: "agentId",
        model: "agent",
        select: "name email mobileNo profilePic city state address status",
      })
      .exec();
    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      allProperty,
      message: propertyMessage.GetAllProperty,
    });
  } catch (error) {
    console.error("Error fetching approved properties for app:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * @desc Get all properties that a specific user has paid for
 * @route GET /api/property/payment/:id
 * @access Public
 */
export const getOnlyPaymentProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyList = await PropertyModel.find({
      isPayment: true,
      paymentUserId: id,
    }).populate({
      path: "agentId",
      model: "agent",
      select: "name email mobileNo profilePic city state address status",
    })
    .exec();
    if (!propertyList || propertyList.length === 0) {
      return res.status(404).json({
        success: false,
        message: errorMessage.PropertyNotFound,
      });
    }
    return res.status(200).json({
      success: true,
      propertyList,
      message: propertyMessage.GetOnlyPaymentProperty,
    });
  } catch (error) {
    console.error("Error fetching paid properties:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};