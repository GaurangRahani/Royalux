import { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { verifyRole } from "../middleware/role.middleware.js"; // Import the new middleware
import { upload } from "../middleware/multer.middleware.js";
import {
  signUp,
  signIn,
  verifyEmail,
  verifyOtp,
  forgotPassword,
  resetPassword,
  changePassword,
  changeProfilePic,
  deleteProfilePic,
  googleLoginUser,
  getCurrentUser,
  deleteUser,
} from "../controller/user.controller.js";
const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-email", verifyEmail);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", verifyRole, changePassword);
router.post(
  "/change-profilePic",
  verifyRole,
  upload.single("profilePic"),
  changeProfilePic
);
router.delete("/delete-profilePic", verifyRole, deleteProfilePic);
router.post("/google-login", googleLoginUser);

router.get("/get-user", verifyRole, getCurrentUser); // Use the new middleware

router.delete("/delete-user", deleteUser);

export const userRouter = router;
