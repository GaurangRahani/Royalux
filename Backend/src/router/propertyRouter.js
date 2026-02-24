import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
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
import { verifyAgent } from "../middleware/agentMiddleware.js";

const router = Router();

router.post(
  "/add-property",
  verifyAgent,
  upload.array("propertyImage", 10),
  addProperty
);
router.get("/getall-property", verifyUser, getAllProperty);
router.get("/getuserall-property", verifyUser, getUserAllProperty);
router.get("/getuserpending-property", verifyUser, getUserPendingProperty);
router.get("/getuserapproval-property", verifyUser, getUserApprovalProperty);
router.get("/getusercancel-property", verifyUser, getUserCancleProperty);
router.post("/set-approveproperty", verifyUser, setApproveProperty);
router.post("/set-cancelproperty", verifyUser, setCancelProperty);

router.get("/getall-property", getAllPropertyForApp);
router.get("/getall-sellproperty", getOnlySellProperty);
router.get("/getall-rentproperty", getOnlyRentProperty);
router.get("/getallapproval-property", getAllApprovalPropertyForApp);


router.get("/get-selected-property/:key", verifyUser, getAllSelectedProperty);
router.get("/get-selected-property-user/:key", verifyUser, getAllSelectedPropertyUser);

router.get("/get-filterproperty", getFilterProperty);

router.put("/set-likeproperty",verifyUser,addLikeInProperty);
router.get("/get-likeproperty",verifyUser,getLikeProperty)

router.put("/set-isproperty",verifyUser,addPaymentInProperty);


router.get("/get-allpayment-property", verifyUser, getOnlyPaymentProperty);

export const propertyRouter = router;

