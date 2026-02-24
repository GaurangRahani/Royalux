import { Router } from "express";
import { verifyRole } from "../middleware/roleMiddleware.js";
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

const router = Router();
const adminOnly = verifyRole(["ADMIN"]);

router.get("/total-user-count", adminOnly, totalUserCount);
router.get("/getall-user", adminOnly, totalUser);
router.get("/total-agent-count", adminOnly, totalAgentCount);
router.get("/getall-approval-agent", adminOnly, totalAgent);
router.get("/total-property-count", adminOnly, totalPropertyCount);
router.get("/total-rentproperty-count", adminOnly, totalRentPropertyCount);
router.get("/total-sellproperty-count", adminOnly, totalSellPropertyCount);
router.get("/getall-property-admin", adminOnly, getAllPropertyForAdmin);
router.get("/getall-rentproperty-admin", adminOnly, getOnlyRentPropertyForAdmin);
router.get("/getall-sellproperty-admin", adminOnly, getOnlySellPropertyForAdmin);
router.get("/recent-property", adminOnly, getRecentProperty);
router.get("/get-all-analytics-count", adminOnly, getAllAnalyticsCount);
router.get("/getall-agent", adminOnly, getAllAgent);
router.post("/review-agent", adminOnly, updateAgentApplicationStatus);

export const adminRouter = router;

