
import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { propertyRouter } from "./propertyRouter.js";
import { agentRouter } from "./agentRouter.js";
import { adminRouter } from "./adminRouter.js";
import { feedbackRouter } from "./feedbackRouter.js";
import { contactRouter } from "./contactRouter.js";

const router = Router();

router.use("/auth", userRouter);
router.use("/property", propertyRouter);
router.use("/agent", agentRouter);
router.use("/admin", adminRouter);
router.use("/feedback", feedbackRouter);
router.use("/contact", contactRouter);

export { router };

