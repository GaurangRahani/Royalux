import { Router } from "express";
const router = Router();
import { totalUserCount, totalUser } from "../controller/userController.js";
import {
  totalPropertyCount,
  totalSellPropertyCount,
  totalRentPropertyCount,
  getAllPropertyForAdmin,
  getOnlyRentPropertyForAdmin,
  getOnlySellPropertyForAdmin,
  getRecentProperty,
} from "../controller/propertyController.js";
import {
  getAllAgent,
  totalAgentCount,
  totalAgent,
  updateAgentApplicationStatus,
  getAllAnalyticsCount,
} from "../controller/adminController.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import { verifyAgent } from "../middleware/agentMiddleware.js";

router.get("/total-user-count", verifyUser, totalUserCount);
router.get("/getall-user", verifyUser, totalUser);
router.get("/total-agent-count", verifyUser, totalAgentCount);
router.get("/getall-approval-agent", verifyUser, totalAgent);
router.get("/total-property-count", verifyUser, totalPropertyCount);
router.get("/total-rentproperty-count", verifyUser, totalRentPropertyCount);
router.get("/total-sellproperty-count", verifyUser, totalSellPropertyCount);
router.get("/getall-property-admin", verifyUser, getAllPropertyForAdmin);
router.get(
  "/getall-rentproperty-admin",
  verifyUser,
  getOnlyRentPropertyForAdmin
);
router.get(
  "/getall-sellproperty-admin",
  verifyUser,
  getOnlySellPropertyForAdmin
);

router.get("/recent-property", verifyUser, getRecentProperty);
router.get("/get-all-analytics-count", verifyUser, getAllAnalyticsCount);
router.get("/getall-agent", verifyUser, getAllAgent);
router.post("/review-agent", verifyUser, updateAgentApplicationStatus);

export const adminRouter = router;

