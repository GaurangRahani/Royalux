import { verifyToken } from "../utils/genToken.js";
import { UserModel } from "../model/user.model.js";
import { Message } from "../config/message.js";

const { errorMessage } = Message;

// Middleware to verify if the user is authenticated
export const verifyUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
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

    // Find the user in the database using the decoded token's ID
    const user = await UserModel.findById(decodeToken.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.InvalidUserToken });
    }

    // Attach the user object to the request for subsequent middleware or controllers
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};