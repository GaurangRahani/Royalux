import { Router } from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js";
import {
  applyAsAgent,
  agentMetting,
  verifyEmail,
  getAgentProperty,
  agentProfile,
  changeProfilePic,
  deleteProfilePic
} from "../controller/agentController.js";

const router = Router();

router.post(
  "/apply-as-agent",
  verifyRole,
  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "reraLicense", maxCount: 1 },
  ]),
  applyAsAgent
);
router.post("/set-meeting", agentMetting);
router.post("/verify-agent", verifyEmail);
router.get("/getall-agentproperty", verifyRole, getAgentProperty);
router.get("/agent-profile", verifyRole, agentProfile);

router.post(
  "/change-profilePic",
  verifyRole,
  upload.single("profilePic"),
  changeProfilePic
);
router.delete("/delete-profilePic", verifyRole, deleteProfilePic);

export const agentRouter = router;

