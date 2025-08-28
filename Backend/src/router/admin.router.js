import { Router } from "express";
const router = Router();
import { totalUserCount, totalUser } from "../controller/user.controller.js";
import {
  totalPropertyCount,
  totalSellPropertyCount,
  totalRentPropertyCount,
  getAllPropertyForAdmin,
  getOnlyRentPropertyForAdmin,
  getOnlySellPropertyForAdmin,
  getRecentProperty,
} from "../controller/property.controller.js";
import {
  getAllAgent,
  totalAgentCount,
  totalAgent,
  setApproveAgent,
  setCancelAgent,
  getAllAnalyticsCount,
} from "../controller/agent.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { verifyAgent } from "../middleware/agent.middleware.js";

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
router.post("/set-approveagent", verifyUser, setApproveAgent);
router.post("/set-cancelagent", verifyUser, setCancelAgent);
       
export const adminRouter = router;
