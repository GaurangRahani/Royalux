import { verifyToken } from "../utils/genToken.js";
import { Message } from "../config/message.js";
import { UserModel } from "../model/user.model.js";
import { AgentModel } from "../model/agent.model.js";

const { errorMessage } = Message;

// Middleware to verify and set the user based on their role (User or Agent)
export const verifyRole = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.UnauthorizedRequest });
    }

    // Verify the token using the secret key from environment variables
    const decodeToken = verifyToken(token, process.env.JWT_SECRET_KEY);

    if (!decodeToken || !decodeToken.id) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.InvalidUserToken });
    }

    // Attempt to find the user from either the UserModel or AgentModel
    const user = await UserModel.findById(decodeToken.id).select("-password");
    let account = user;
    if (!account) {
      account = await AgentModel.findById(decodeToken.id).select("-password");
    }

    if (!account) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.InvalidUserToken });
    }

    // Attach the found user/agent object to the request
    req.user = account;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};