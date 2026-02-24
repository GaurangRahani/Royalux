import { PropertyModel } from "../model/propertyModel.js";
import { UserModel } from "../model/userModel.js";
import { Message } from "../config/message.js";
import { sendEmail } from "../utils/nodemailer.js";

const { agentMessage, errorMessage, emailMessage } = Message;

export const getAllAgent = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSee });
    }

    // Fetch users who have a pending agent application
    const allAgentRequests = await UserModel.find({
      agentApplicationStatus: "PENDING",
    });

    if (!allAgentRequests || allAgentRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending agent applications found.",
      });
    }

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    result.totalRequests = allAgentRequests.length;
    result.pageCount = Math.ceil(result.totalRequests / limit);

    if (endIndex < allAgentRequests.length) {
      result.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
      };
    }

    result.requests = allAgentRequests.slice(startIndex, endIndex);

    return res.status(200).json({
      success: true,
      result,
      message: "Pending agent applications fetched successfully.",
    });
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

    // Count users who are approved agents
    const agents = await UserModel.countDocuments({
      agentApplicationStatus: "APPROVED",
    });

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

    // Fetch all users who are approved agents
    const agents = await UserModel.find({
      agentApplicationStatus: "APPROVED",
    });

    if (!agents || agents.length === 0) {
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

export const updateAgentApplicationStatus = async (req, res) => {
  try {
    const admin = req.user;
    const { id, status, reason } = req.body;

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantChange,
      });
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use APPROVED or REJECTED.",
      });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.agentApplicationStatus = status;
    await user.save();

    let subject = "";
    let content = "";
    let imgUrl = "";

    if (status === "APPROVED") {
      subject = emailMessage.AgentApprovalSubject;
      imgUrl =
        "https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7301.jpg?t=st=1712474534~exp=1712475134~hmac=e691d951a8482dc11cb46e9cba0ea4cd1c36c3aed04f41e911af476d85fb0d41";
      content = `
                <h1>Agent Approval Successful</h1>
                <p>Dear ${user.name},</p>
                <p>Your agent application has been successfully processed and APPROVED by the admin.</p>
                <p><strong>Next Step:</strong> Please log in to your dashboard and choose a subscription plan to start listing properties.</p>
                <p>Your account details:</p>
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}
                <p>We're pleased to have you onboard our team.</p>
            `;
    } else {
      subject = emailMessage.AgentCancleSubject;
      imgUrl =
        "https://img.freepik.com/free-photo/blocked-unavailable-decline-accesibility-closed_53876-133630.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712188800&semt=sph";
      content = `
                <h1>Agent Application Rejected</h1>
                <p>Dear ${user.name},</p>
                <p>Unfortunately, your agent application request has been rejected by the admin.</p>
                ${reason ? `<p><strong>Reason for rejection:</strong> ${reason}</p>` : ""}
                <p>If you have any questions regarding this decision, please feel free to reach out to our support team.</p>
            `;
    }

    const emailTemp = `
            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div style="padding: 20px; background-color: white; text-align: center;">
                                        <img src="${imgUrl}" alt="Logo" width="200" height="150" style="display: block; margin: 0 auto;">
                                        ${content}
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
      to: user.email,
      subject: subject,
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      status: user.agentApplicationStatus,
      message:
        status === "APPROVED"
          ? agentMessage.SetApproveAgent
          : agentMessage.SetCancelAgent,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

export const getAllAnalyticsCount = async (req, res) => {
  try {
    const admin = req.user;
    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: errorMessage.UserCantSee,
      });
    }

    const [
      totalProperties,
      propertiesForRent,
      propertiesForSale,
      totalUsers,
      totalAgents,
    ] = await Promise.all([
      PropertyModel.countDocuments({}),
      PropertyModel.countDocuments({ type: "Rent" }),
      PropertyModel.countDocuments({ type: "Sell" }),
      UserModel.countDocuments({}),
      UserModel.countDocuments({ agentApplicationStatus: "APPROVED" }),
    ]);

    const stats = {
      totalProperties,
      propertiesForRent,
      propertiesForSale,
      totalUsers,
      totalAgents,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

