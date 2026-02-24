import { PropertyModel } from "../model/propertyModel.js";
import { UserModel } from "../model/userModel.js";
import { generateToken } from "../utils/genToken.js";
import { publicUrl } from "../utils/profilepic.js";
import { sendEmail } from "../utils/nodemailer.js";
import {
  fileUploadInCloudinary,
  fileDestroyInCloudinary,
} from "../utils/clodinary.js";

import { Message } from "../config/message.js";
const { agentMessage, errorMessage, emailMessage } = Message;

export const applyAsAgent = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const { address } = req.body;

    if (user.agentApplicationStatus === "APPROVED") {
      return res
        .status(400)
        .json({ success: false, message: "You are already an approved agent." });
    }

    if (user.agentApplicationStatus === "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Your application is already pending.",
      });
    }

    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }

    if (
      !req.files ||
      !req.files.aadhaarFront ||
      !req.files.aadhaarBack ||
      !req.files.panCard
    ) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar Front, Aadhaar Back, and PAN Card are required",
      });
    }

    // Upload files to Cloudinary using keys that match the frontend/router
    const aadhaarFrontResult = await fileUploadInCloudinary(
      req.files.aadhaarFront[0].path
    );
    const aadhaarBackResult = await fileUploadInCloudinary(
      req.files.aadhaarBack[0].path
    );
    const panCardResult = await fileUploadInCloudinary(
      req.files.panCard[0].path
    );

    let reraLicenseUrl = undefined;
    if (req.files.reraLicense) {
      const reraLicenseResult = await fileUploadInCloudinary(
        req.files.reraLicense[0].path
      );
      reraLicenseUrl = reraLicenseResult.secure_url;
    }

    // Update the existing user object
    user.agentProfile = {
      address,
      documents: {
        aadhaarFront: aadhaarFrontResult.secure_url,
        aadhaarBack: aadhaarBackResult.secure_url,
        panCard: panCardResult.secure_url,
        reraLicense: reraLicenseUrl,
      },
    };
    user.agentApplicationStatus = "PENDING";

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Application submitted successfully. Waiting for admin approval.",
      agentApplicationStatus: user.agentApplicationStatus,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const agentMetting = async (req, res) => {
  try {
    const { email, date, time, name, link } = req.body;

    if (!email || !date || !time || !name || !link) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    const mailFormat = `
                <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <div style="padding: 20px; background-color: #ffffff; text-align: center;">
                                        <img src="https://media.istockphoto.com/id/1280210882/vector/vector-of-a-businesspeople-sitting-at-table-brainstorming.jpg?s=612x612&w=0&k=20&c=lVF0QbHutKRscOb0Szj0Es_BT4GUqnabigEd9uo6ZKI=" alt="OTP Image" width="250" height="170" style="display: block; margin: 0 auto;">
                                        <h2>Invitation to Google Meet Meeting</h2>
                                        <p>Dear ${name},</p>
                                        <p>I hope this email finds you well. I would like to invite you to a meeting via Google Meet:</p>
                                        <ul>
                                          <li><strong>Meeting Title:</strong>💫Discussion with our team💫</li>
                                          <li><strong>Date:</strong> ${date}</li>
                                          <li><strong>Time:</strong> ${time}</li>
                                          <li><strong>Meeting Link:</strong><a href="${link}">💥Join Our Meeting💥</a></li>
                                        </ul>
                                        <p>Please let me know if the proposed date and time work for you. If not, feel free to suggest an alternative time.</p>
                                        <p>Looking forward to our discussion!</p>
                                        <p>Best regards,</p>
                                        <p>Home-Hub Market</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </table>
                `;

    const mailOptions = {
      to: email,
      subject: "Home-Hub Market",
      html: mailFormat,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: agentMessage.AgentMetting });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const mailFormat = `
                        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div style="padding: 20px; background-color: white; text-align: center; color: white;">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZ_IHiDuvXTtUevOvzGFNbDfWwlGSNTqXYQ&usqp=CAU" alt="verify agent" width="250" height="170" style="display: block; margin: 0 auto;">
                                                <h1>**Verification**</h1>
                                                <p>Hello there!</p>
                                                <p>If you want to become an agent, click on the link below and fill up the form..</p>
                                                <a href="${`http://localhost:3000/agent/`}">💥Click this link to fill form💥</a>
                                                <p>Best regards</p>
                                                <p>Home-Hub Market</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        </table>
                        `;

    const mailOptions = {
      to: email,
      subject: "Home-Hub Market",
      html: mailFormat,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: agentMessage.AgentMetting });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const getAgentProperty = async (req, res) => {
  try {
    const agent = req.user;

    const agentAllProperty = await PropertyModel.find({
      agentId: agent.id,
    }).populate({
      path: "userId",
      model: "user",
      select: "name email mobileNo -_id",
    });

    if (!agentAllProperty) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.PropertyNotFound });
    }

    return res.status(200).json({
      success: true,
      agentAllProperty,
      message: agentMessage.AllAgentAssignProperty,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const agentProfile = async (req, res) => {
  try {
    const agent = req.user;
    return res
      .status(200)
      .json({ success: true, data: agent, message: agentMessage.AgentDeatils });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const changeProfilePic = async (req, res) => {
  try {
    const user = req.user;

    const profilePicLocalPath = req.file?.path;

    if (!profilePicLocalPath) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.ProfilePicNotFound });
    }

    if (user.publicUrl !== null) {
      await fileDestroyInCloudinary(user.publicUrl);
    }

    const profilePicInCloudinary = await fileUploadInCloudinary(
      profilePicLocalPath
    );

    user.profilePic = profilePicInCloudinary.secure_url;
    user.publicUrl = profilePicInCloudinary.public_id;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: agentMessage.ChangeProfilePic });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const deleteProfilePic = async (req, res) => {
  try {
    const user = req.user;

    await fileDestroyInCloudinary(user.publicUrl);

    const nameFirstLetter = user.name.toLowerCase().slice(0, 1);
    const url = publicUrl(nameFirstLetter);
    user.profilePic = url;
    user.publicUrl = null;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: agentMessage.DeleteProfilePic });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

