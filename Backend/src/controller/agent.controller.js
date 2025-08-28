import { AgentModel } from "../model/agent.model.js";
import { PropertyModel } from "../model/property.model.js";
import { UserModel } from "../model/user.model.js";
import { generateToken } from "../utils/genToken.js";
import { publicUrl } from "../utils/profilepic.js";
import { sendEmail } from "../utils/nodemailer.js";
import {
  fileUploadInCloudinary,
  fileDestroyInCloudinary,
} from "../utils/clodinary.js";

import { Message } from "../config/message.js";
const { agentMessage, errorMessage, emailMessage } = Message;

export const addAgent = async (req, res) => {
  try {
    const data = req.body;

    if (
      (data.name && data.email && data.mobileNo && data.password) === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    const findAgent = await AgentModel.findOne({ email: data.email });

    if (findAgent) {
      return res.status(401).json({ message: errorMessage.AgentAlreadyExits });
    }

    const nameFirstLetter = data.name.toLowerCase().slice(0, 1);
    const url = publicUrl(nameFirstLetter);

    const adharFront = await fileUploadInCloudinary(
      req.files["adharCardFront"][0].path
    );

    const adharBack = await fileUploadInCloudinary(
      req.files["adharCardBack"][0].path
    );

    const panCard = await fileUploadInCloudinary(req.files["panCard"][0].path);

    data.adharCardFront = adharFront.secure_url;
    data.adharCardBack = adharBack.secure_url;
    data.panCard = panCard.secure_url;

    const agent = new AgentModel({ ...data, profilePic: url });
    await agent.save();

    const token = generateToken({ id: agent._id });

    const emailTemp = `
              <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
        <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <div style="padding: 20px; background-color: white; text-align: center;">
                        <img src="https://media.istockphoto.com/id/1472307744/photo/clipboard-and-pencil-on-blue-background-notepad-icon-clipboard-task-management-todo-check.webp?b=1&s=170667a&w=0&k=20&c=WfRoNKWq5Dr-23RuNifv1kbIR1LVuZAsCzzSH2I3HsY=" alt="Logo" width="200" height="100" style="display: block; margin: 0 auto;">
                            <h1>Welcome to Our Service!</h1>
                            <p>Dear ${agent.name},</p>
                            <p>Thank you for registering with Our app.</p>
                            <p>Your account details:</p>
                            
                            <strong>Agentname:</strong> ${agent.name}<br>
                            <strong>Email:</strong> ${agent.email}
                            
                            <p>We're excited to have you on board to out team.</p>
                            <p>Our Team will conduct one meeting within 24 hours so pleace connect into our meeting and this meeting link will be provide in your email.💌</p>
                            <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <b>homehubmarket123@gmail.com</b>.</p>
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
      to: agent.email,
      subject: emailMessage.SignupSubject,
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res.status(201).json({
      success: true,
      agent,
      token: token,
      message: agentMessage.AddAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const getAllAgent = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSee });
    }

    const allAgent = await AgentModel.find();
    if (!allAgent) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.AgentNotFound });
    }

    let page = req.query.page;
    let limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    result.totalAgent = allAgent.length;
    result.pageCount = Math.ceil(result.totalAgent / limit);

    if (endIndex < allAgent.length) {
      result.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
      };
    }

    result.agents = allAgent.slice(startIndex, endIndex);

    return res.status(200).json({
      success: true,
      result,
      message: agentMessage.GetAllAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const agentMetting = async (req, res) => {
  try {
    const { email, date, time, name, link } = req.body;

    if ((email && date && time && name && link) == undefined) {
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

export const totalAgentCount = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSeeTotal });
    }

    const agents = await AgentModel.find({ status: "approval" }).count();
    if (!agents) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.AgentNotFound });
    }

    return res.status(200).json({
      success: true,
      agents,
      message: agentMessage.TotalAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const totalAgent = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSee });
    }

    const agents = await AgentModel.find({ status: "approval" });
    if (!agents) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.AgentNotFound });
    }

    return res.status(200).json({
      success: true,
      agents,
      message: agentMessage.TotalAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const setApproveAgent = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantChange });
    }

    const data = req.body.id;

    const agent = await AgentModel.findById(data);
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.AgentNotFound });
    }

    agent.status = "approval";
    await agent.save();

    const emailTemp = `
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0">
                      <tr>
                          <td>
                              <div style="padding: 20px; background-color: white; text-align: center;">
                                  <img src="https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7301.jpg?t=st=1712474534~exp=1712475134~hmac=e691d951a8482dc11cb46e9cba0ea4cd1c36c3aed04f41e911af476d85fb0d41" alt="Logo" width="200" height="150" style="display: block; margin: 0 auto;">
                                  <h1>Agent Approval Successful</h1>
                                  <p>Dear ${agent.name},</p>
                                  <p>Your agent approval has been successfully processed by the admin.</p>
                                  <p>Your account details:</p>
                                  <strong>Agent Name:</strong> ${agent.name}<br>
                                  <strong>Email:</strong> ${agent.email}
                                  <p>We're pleased to have you onboard our team.</p>
                                  <p>An admin has approved your agent request, and you are now part of our service.</p>
                                  <p>If you have any further questions or need assistance, please don't hesitate to reach out to our support team.</p>
                                  <p>Best regards,</p>
                                  <p>Your Admin Team</p>
                              </div>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      `;

    const mailOptions = {
      to: agent.email,
      subject: emailMessage.AgentApprovalSubject,
      html: emailTemp,
    };

    await sendEmail(mailOptions);
    return res.status(200).json({
      success: true,
      agent,
      message: agentMessage.SetApproveAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const setCancelAgent = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantChange });
    }

    const data = req.body.id;

    const agent = await AgentModel.findById(data);
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.AgentNotFound });
    }

    agent.status = "cancel";
    await agent.save();

    const emailTemp = `
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0">
                      <tr>
                          <td>
                              <div style="padding: 20px; background-color: white; text-align: center;">
                                  <img src="https://img.freepik.com/free-photo/blocked-unavailable-decline-accesibility-closed_53876-133630.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712188800&semt=sph" alt="Logo" width="200" height="150" style="display: block; margin: 0 auto;">
                                  <h1>Agent Approval Canceled</h1>
                                  <p>Dear ${agent.name},</p>
                                  <p>Your agent approval request has been canceled by the admin.</p>
                                  <p>If you have any questions regarding this cancellation or need further assistance, please feel free to reach out to our support team.</p>
                                  <p>We apologize for any inconvenience caused.</p>
                                  <p>Best regards,</p>
                                  <p>Your Admin Team</p>
                              </div>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      `;

    const mailOptions = {
      to: agent.email,
      subject: emailMessage.AgentCancleSubject,
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      agent,
      message: agentMessage.SetCancelAgent,
    });
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

export const getAllAnalyticsCount = async (req, res) => {
  try {
    // Fetch all counts concurrently using Promise.all for better performance
    const [
      totalProperties,
      propertiesForRent,
      propertiesForSale,
      totalUsers,
      totalAgents
    ] = await Promise.all([
      PropertyModel.countDocuments({}),
      PropertyModel.countDocuments({ type: 'Rent' }),
      PropertyModel.countDocuments({ type: 'Sell' }),
      UserModel.countDocuments({}),
      AgentModel.countDocuments({})
    ]);

    // Construct response object with counts
    const stats = {
      totalProperties,
      propertiesForRent,
      propertiesForSale,
      totalUsers,
      totalAgents
    };

    // Send successful response
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    // Handle any errors
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}