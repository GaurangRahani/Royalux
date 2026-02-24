import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { addQuery,getQuery } from "../controller/contactController.js";

const router = Router();

router.post('/add-userquery' , verifyUser ,addQuery )
router.get('/get-userqueries' , verifyUser ,getQuery )

export const contactRouter = router;

