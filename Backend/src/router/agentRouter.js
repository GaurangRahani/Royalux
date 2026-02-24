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
const agentOnly = verifyRole(["AGENT"]);
const anyUser = verifyRole(); // for initial application where user isn't an agent yet

router.post(
  "/apply-as-agent",
  anyUser,
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
router.get("/getall-agentproperty", agentOnly, getAgentProperty);
router.get("/agent-profile", agentOnly, agentProfile);

router.post(
  "/change-profilePic",
  agentOnly,
  upload.single("profilePic"),
  changeProfilePic
);
router.delete("/delete-profilePic", agentOnly, deleteProfilePic);

export const agentRouter = router;

