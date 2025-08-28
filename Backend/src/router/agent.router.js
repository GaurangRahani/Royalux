import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyAgent } from "../middleware/agent.middleware.js";
import {
  addAgent,
  agentMetting,
  verifyEmail,
  getAgentProperty,
  agentProfile,
  changeProfilePic,
  deleteProfilePic
} from "../controller/agent.controller.js";

const router = Router();

router.post(
  "/add-agent",
  upload.fields([
    { name: "adharCardFront", maxCount: 1 },
    { name: "adharCardBack", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  addAgent
);
router.post("/set-meeting", agentMetting);
router.post("/verify-agent", verifyEmail);
router.get("/getall-agentproperty",verifyAgent,getAgentProperty);
router.get("/agent-profile",verifyAgent,agentProfile);

router.post(
  "/change-profilePic",
  verifyAgent,
  upload.single("profilePic"),
  changeProfilePic
);
router.delete("/delete-profilePic", verifyAgent, deleteProfilePic);

export const agentRouter = router;
