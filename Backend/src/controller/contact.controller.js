import { contactModel } from "../model/contact.model.js";
import { Message } from "../config/message.js";

const { ContactMessage, errorMessage } = Message;

export const addQuery = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.AdminCantSend,
      });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: errorMessage.NotEnterValidFeilds,
      });
    }

    if (user.email !== email) {
      return res.status(400).json({
        success: false,
        message: errorMessage.InvalidData,
      });
    }

    const findContact = await contactModel.findOne({ email });
    if (findContact) {
      return res.status(409).json({
        success: false,
        message: errorMessage.findContact,
      });
    }

    const userQuery = new contactModel({
      name,
      email,
      subject,
      message,
    });
    await userQuery.save();

    return res.status(201).json({
      success: true,
      data: userQuery,
      message: ContactMessage.SubmitContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while adding the query.",
    });
  }
};

export const getQuery = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const queryList = await contactModel.find();
    if (!queryList || queryList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No queries found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: queryList,
      message: ContactMessage.GetAllQueries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching queries.",
    });
  }
};