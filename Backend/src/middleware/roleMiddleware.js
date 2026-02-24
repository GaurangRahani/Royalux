import { verifyToken } from "../utils/genToken.js";
import { Message } from "../config/message.js";
import { UserModel } from "../model/userModel.js";

const { errorMessage } = Message;

// Middleware to verify token and optionally check for specific roles
export const verifyRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: errorMessage.UnauthorizedRequest });
      }

      // Verify the token
      const decodeToken = verifyToken(token, process.env.JWT_SECRET_KEY);

      if (!decodeToken || !decodeToken.id) {
        return res
          .status(401)
          .json({ success: false, message: errorMessage.InvalidUserToken });
      }

      // Find the user from the unified UserModel
      const user = await UserModel.findById(decodeToken.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: errorMessage.InvalidUserToken });
      }

      // If roles are specified, check if the user has one of the allowed roles
      // Note: For agents, we check their approval status
      if (allowedRoles.length > 0) {
        const hasRole = allowedRoles.some((role) => {
          if (role === "ADMIN") return user.role === "ADMIN";
          if (role === "AGENT") return user.agentApplicationStatus === "APPROVED";
          if (role === "USER") return user.role === "USER";
          return false;
        });

        if (!hasRole) {
          return res.status(403).json({
            success: false,
            message: "You do not have permission to access this resource.",
          });
        }
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
};
