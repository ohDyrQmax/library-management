import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { employeeRegister, employeeLogin } from "../controllers/employee.js";

const router = express.Router();

router.post("/register", employeeRegister);
router.post("/login", employeeLogin);

// router.get("/:id", verifyToken, getBorrowerDetail);

export default router;