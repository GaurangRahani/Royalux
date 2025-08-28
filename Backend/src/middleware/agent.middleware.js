import { verifyToken } from "../utils/genToken.js";
import { AgentModel } from "../model/agent.model.js";
import { Message } from "../config/message.js";

const { errorMessage } = Message;

// Middleware to verify if the user is an agent
export const verifyAgent = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.UnauthorizedRequest });
    }

    // Verify the token and get the decoded payload
    // Note: It's a better practice to use the secret key from an environment variable directly
    // within the `verifyToken` function.
    const decodeToken = verifyToken(token, process.env.JWT_SECRET_KEY);
    
    if (!decodeToken || !decodeToken.id) {
        return res
            .status(401)
            .json({ success: false, message: errorMessage.InvalidUserToken });
    }

    // Find the agent in the database using the decoded token's ID
    const agent = await AgentModel.findById(decodeToken.id).select("-password");

    if (!agent) {
      return res
        .status(401)
        .json({ success: false, message: errorMessage.InvalidUserToken });
    }
    
    // Attach the agent object to the request for subsequent middleware or controllers
    req.user = agent;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};