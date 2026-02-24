import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js"; // Import the new middleware
import { upload } from "../middleware/multerMiddleware.js";
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
} from "../controller/userController.js";
const router = Router();

// Authentication Routes
router.post("/sign-up", signUp);
router.post("/verify-otp", verifyOtp); // Finalizes registration and logs user in
router.post("/sign-in", signIn);

// Password Management Routes
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

router.delete("/delete-user", verifyRole, deleteUser);

export const userRouter = router;

