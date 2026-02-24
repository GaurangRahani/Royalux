import { Router } from "express";
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
const auth = verifyRole();

// Authentication Routes
router.post("/sign-up", signUp);
router.post("/verify-otp", verifyOtp); // Finalizes registration and logs user in
router.post("/sign-in", signIn);

// Password Management Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", auth, changePassword);
router.post(
  "/change-profilePic",
  auth,
  upload.single("profilePic"),
  changeProfilePic
);
router.delete("/delete-profilePic", auth, deleteProfilePic);
router.post("/google-login", googleLoginUser);

router.get("/get-user", auth, getCurrentUser);

router.delete("/delete-user", auth, deleteUser);

export const userRouter = router;

