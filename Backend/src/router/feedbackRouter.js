import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { addFeedBack,getFeedBack } from "../controller/feedbackController.js";

const router = Router();

router.post('/add-feedback' , verifyUser ,addFeedBack )
router.get('/get-feedbacks' , verifyUser ,getFeedBack )

export const feedbackRouter = router;

