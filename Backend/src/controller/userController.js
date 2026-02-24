import { UserModel } from "../model/userModel.js";
import { AgentModel } from "../model/agentModel.js";
import { PropertyModel } from "../model/propertyModel.js";
import { generateToken, verifyToken } from "../utils/genToken.js";
import { sendEmail } from "../utils/nodemailer.js";
import { generateOTP } from "../utils/genOtp.js";
import { OtpModel } from "../model/otpModel.js";
import { publicUrl } from "../utils/profilepic.js";
import {
  fileDestroyInCloudinary,
  fileUploadInCloudinary,
} from "../utils/clodinary.js";
import { Message } from "../config/message.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENTID);
const { userMessage, errorMessage, emailMessage } = Message;

// Controller for user sign-up
// Step 1: Initiator - Parks signup data and sends OTP
export const signUp = async (req, res) => {
  try {
    const { name, email, mobileNo, password, role } = req.body;

    if (!name || !email || !mobileNo || !password) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    if (role === "ADMIN") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.SelectValidRole });
    }

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return res
        .status(409)
        .json({ success: false, message: errorMessage.UserAlreadyExits });
    }

    const otp = generateOTP();

    // "Park" the data in the OtpModel waiting room
    await OtpModel.findOneAndUpdate(
      { email },
      { name, mobileNo, password, otp },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const mailFormat = `
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="padding: 20px; background-color: #ffffff; text-align: center;">
                    <img src="https://media.istockphoto.com/id/1300422159/photo/woman-hand-enter-a-one-time-password-for-the-validation-process-mobile-otp-secure.webp?b=1&s=170667a&w=0&k=20&c=eADS7XcHTFs4kNItYwelOtHYFVbl0RWpSuXJgjFjai4=" alt="OTP Image" width="200" height="200" style="display: block; margin: 0 auto;">
                    <h1>Signup OTP Verification</h1>
                    <p>Hello ${name}!</p>
                    <p>Your OTP code for signup is: <strong style="font-size: 24px;">${otp}</strong></p>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
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
      subject: emailMessage.VerifyEmailSubject,
      html: mailFormat,
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete signup.",
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for user sign-in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.UserNotExits });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.InvalidCredentials });
    }

    let tokenMessage;
    if (user.role === "ADMIN") {
      tokenMessage = userMessage.SignInAdmin;
    } else if (user.agentApplicationStatus === "APPROVED") {
      tokenMessage = userMessage.SignInAgent;
    } else {
      tokenMessage = userMessage.SignInUser;
    }

    const userData = user.getData();
    const userToken = generateToken({ id: user._id });

    return res.status(200).json({
      success: true,
      data: userData,
      token: userToken,
      message: tokenMessage,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to verify a user's email
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("called");
    const otp = generateOTP();

    const mailFormat = `
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="padding: 20px; background-color: #ffffff; text-align: center;">
                    <img src="https://media.istockphoto.com/id/1300422159/photo/woman-hand-enter-a-one-time-password-for-the-validation-process-mobile-otp-secure.webp?b=1&s=170667a&w=0&k=20&c=eADS7XcHTFs4kNItYwelOtHYFVbl0RWpSuXJgjFjai4=" alt="OTP Image" width="200" height="200" style="display: block; margin: 0 auto;">
                    <h1>One-Time Password OTP Verification</h1>
                    <p>Hello there!</p>
                    <p>Your OTP code is: <strong style="font-size: 24px;">${otp}</strong></p>
                    <p>This OTP will expire in 1 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                    <P>Don't share your otp with someone else.</p>
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
      subject: emailMessage.VerifyEmailSubject,
      html: mailFormat,
    };

    await sendEmail(mailOptions);

    await OtpModel.findOneAndDelete({ email });
    const userOtp = new OtpModel({ email: email, otp: otp });
    await userOtp.save();

    setTimeout(async () => {
      await OtpModel.findOneAndDelete({ email: email });
    }, 1000 * 60);

    return res
      .status(200)
      .json({ success: true, message: userMessage.VerifyEmail });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to verify the received OTP
// Step 2: Finalizer - Verifies OTP and creates the actual user
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await OtpModel.findOne({ email });

    if (!otpData) {
      return res
        .status(404)
        .json({ success: false, message: "OTP expired or not found." });
    }

    if (otpData.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.OtpWrong });
    }

    // Capture the parked data from OtpModel
    const { name, mobileNo, password } = otpData;

    // Create the actual user in UserModel
    const nameFirstLetter = name.toLowerCase().slice(0, 1);
    const url = publicUrl(nameFirstLetter);

    const user = new UserModel({
      name,
      email,
      mobileNo,
      password,
      profilePic: url,
    });
    await user.save();

    // Cleanup the waiting room
    await OtpModel.findOneAndDelete({ email });

    // Send the Welcome Email
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
                    <p>Dear ${user.name},</p>
                    <p>Thank you for registering. You're now a verified part of our community.</p>
                    <p>Your account details:</p>
                    <strong>Username:</strong> ${user.name}<br>
                    <strong>Email:</strong> ${user.email}
                    <p>We're excited to have you on board!</p>
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
      subject: emailMessage.SignupSubject,
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    // Generate Token and Login the user
    const token = generateToken({ id: user._id });
    const userData = user.getData();

    return res.status(201).json({
      success: true,
      User: userData,
      token: token,
      message: userMessage.SignUp,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for forgot password functionality
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: userMessage.UserNotExits });
    }

    const otp = generateOTP();

    const mailFormat = `
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="padding: 20px; background-color: #ffffff; text-align: center;">
                    <img src="https://media.istockphoto.com/id/1300422159/photo/woman-hand-enter-a-one-time-password-for-the-validation-process-mobile-otp-secure.webp?b=1&s=170667a&w=0&k=20&c=eADS7XcHTFs4kNItYwelOtHYFVbl0RWpSuXJgjFjai4=" alt="OTP Image" width="200" height="200" style="display: block; margin: 0 auto;">
                    <h1>Forgot Password OTP Verification</h1>
                    <p>Hello ${findUser.name}!</p>
                    <p>Your OTP code to reset your password is: <strong style="font-size: 24px;">${otp}</strong></p>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    const mailOptions = {
      to: findUser.email,
      subject: emailMessage.ForgotPasswordSubject,
      html: mailFormat,
    };

    await sendEmail(mailOptions);

    // Save/Update the OTP in the separate model (no parked data needed here)
    await OtpModel.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: userMessage.ForgotPassword,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for resetting a password
// Step 2: Finalizer - Verifies OTP and updates the password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    const findOtp = await OtpModel.findOne({ email });
    if (!findOtp || findOtp.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.OtpWrong });
    }

    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.UserNotExits });
    }

    // Set new password (the userModel pre-save hook will hash it automatically)
    findUser.password = newPassword;
    await findUser.save();

    // Cleanup the OTP record
    await OtpModel.findOneAndDelete({ email });

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for changing a user's password (while logged in)
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.NotEnterValidFeilds });
    }

    // Verify if the old password is correct
    const isMatch = await user.isPasswordCorrect(oldPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect current password." });
    }

    // Update to new password (hashed automatically in userModel pre-save hook)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to get the current user's data
export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      userData: req.user,
      message: userMessage.GetCurrentUser,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for changing a user's profile picture
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
      .json({ success: true, message: userMessage.ChangeProfilePic });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for deleting a user's profile picture
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
      .json({ success: true, message: userMessage.DeleteProfilePic });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller for Google OAuth login
export const googleLoginUser = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENTID,
    });
    const payload = ticket.getPayload();
    const findUser = await UserModel.findOne({ email: payload.email });
    if (findUser) {
      const userToken = generateToken({ id: findUser._id });
      return res.status(200).json({
        success: true,
        userData: findUser.getData(),
        token: userToken,
        message: userMessage.SignInUser,
      });
    }
    const result = await fileUploadInCloudinary(payload.picture);
    const newUser = new UserModel({
      name: payload.name,
      email: payload.email,
      profilePic: result.secure_url,
      publicUrl: result.public_id,
      isLogin: true,
    });
    await newUser.save();
    const userToken = generateToken({ id: newUser._id });
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
                    <p>Dear ${newUser.name},</p>
                    <p>Thank you for registering with Our app. You're now a part of our community.</p>
                    <p>Your account details:</p>
                    <strong>Username:</strong> ${newUser.name}<br>
                    <strong>Email:</strong> ${newUser.email}
                    <p>We're excited to have you on board, and you can start using our service right away.</p>
                    <p>If you have any questions or need assistance, please don't hesitate to contact our support team at pradiptimbadiya@gmail.com.</p>
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
      to: newUser.email,
      subject: "Home-Hub Market",
      html: emailTemp,
    };

    await sendEmail(mailOptions);
    const userData = newUser.getData();

    return res.status(201).json({
      success: true,
      User: userData,
      token: userToken,
      message: userMessage.GoogleLoginUser,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to get the total number of users
export const totalUserCount = async (req, res) => {
  try {
    const { user: admin } = req;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSeeTotal });
    }

    const users = await UserModel.find({ role: "USER" }).count();
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.UserNotFound });
    }

    return res.status(200).json({
      success: true,
      users,
      message: userMessage.TotalUser,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to get a paginated list of all users
export const totalUser = async (req, res) => {
  try {
    const { user: admin } = req;

    if (admin.role === "USER") {
      return res
        .status(400)
        .json({ success: false, message: errorMessage.UserCantSee });
    }

    const usersList = await UserModel.find({ role: "USER" });
    if (!usersList) {
      return res
        .status(404)
        .json({ success: false, message: errorMessage.UserNotFound });
    }

    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    result.totalUser = usersList.length;
    result.pageCount = Math.ceil(result.totalUser / limit);

    if (endIndex < usersList.length) {
      result.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
      };
    }

    result.users = usersList.slice(startIndex, endIndex);
    return res.status(200).json({
      success: true,
      result,
      message: userMessage.TotalUser,
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
  try {
    // Note: It's a best practice to handle token verification and user lookup
    // using an authentication middleware (e.g., `authMiddleware.js`).
    // Assuming `req.user` is populated by the middleware, the following
    // code can be simplified.
    const { password } = req.body;
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.UnauthorizedRequest });
    }

    const matchUserPasssword = await user.isPasswordCorrect(password);
    if (!matchUserPasssword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    await UserModel.findByIdAndDelete({ _id: user.id });
    await PropertyModel.deleteMany({ userId: user.id });

    return res
      .status(200)
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

