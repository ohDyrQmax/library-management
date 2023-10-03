import express from "express";
import { getBorrowerDetail } from "../controllers/borrower.js";
import { verifyToken } from "../middleware/auth.js";
import { borrowerRegister, borrowerLogin } from "../controllers/borrower.js";

const router = express.Router();

router.post("/register", borrowerRegister);
router.post("/login", borrowerLogin);

// router.get("/:id", verifyToken, getBorrowerDetail);

export default router;