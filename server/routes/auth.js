import express from "express";
import { borrowerRegister, borrowerLogin } from "../controllers/borrower/auth.js";
import { employeeRegister, employeeLogin } from "../controllers/employee/auth.js";

const router = express.Router();


router.post("/borrower/register", borrowerRegister);


router.post("/employee/register", employeeRegister);

export default router;