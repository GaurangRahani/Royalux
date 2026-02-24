import { Router } from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js";
import {
  addProperty,
  getAllProperty,
  setApproveProperty,
  setCancelProperty,
  getAllPropertyForApp,
  getOnlySellProperty,
  getOnlyRentProperty,
  getAllSelectedProperty,
  getAllSelectedPropertyUser,
  getUserAllProperty,
  getUserApprovalProperty,
  getUserCancleProperty,
  getUserPendingProperty,
  getFilterProperty,
  addLikeInProperty,
  getLikeProperty,
  addPaymentInProperty,
  getAllApprovalPropertyForApp,
  getOnlyPaymentProperty
} from "../controller/propertyController.js";

const router = Router();

// Routes for Agents (Verified)
router.post(
  "/add-property",
  verifyRole(["AGENT"]),
  upload.array("propertyImage", 10),
  addProperty
);

router.get("/getuserall-property", verifyRole(["AGENT"]), getUserAllProperty);
router.get("/getuserpending-property", verifyRole(["AGENT"]), getUserPendingProperty);
router.get("/getuserapproval-property", verifyRole(["AGENT"]), getUserApprovalProperty);
router.get("/getusercancel-property", verifyRole(["AGENT"]), getUserCancleProperty);

// Routes for Admin
router.get("/getall-property", verifyRole(["ADMIN"]), getAllProperty);
router.post("/set-approveproperty", verifyRole(["ADMIN"]), setApproveProperty);
router.post("/set-cancelproperty", verifyRole(["ADMIN"]), setCancelProperty);
router.get("/get-selected-property/:key", verifyRole(["ADMIN"]), getAllSelectedProperty);

// Routes for All Authenticated Users (User/Agent/Admin)
router.get("/get-selected-property-user/:key", verifyRole(), getAllSelectedPropertyUser);
router.put("/set-likeproperty", verifyRole(), addLikeInProperty);
router.get("/get-likeproperty", verifyRole(), getLikeProperty);
router.put("/set-isproperty", verifyRole(), addPaymentInProperty); // Check if this should be restricted
router.get("/get-allpayment-property", verifyRole(), getOnlyPaymentProperty);

// Public Routes
router.get("/getall-property-app", getAllPropertyForApp);
router.get("/getall-sellproperty", getOnlySellProperty);
router.get("/getall-rentproperty", getOnlyRentProperty);
router.get("/getallapproval-property", getAllApprovalPropertyForApp);
router.get("/get-filterproperty", getFilterProperty);

export const propertyRouter = router;
