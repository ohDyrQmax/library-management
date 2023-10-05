import express from "express";
import {verifyAuthorizationStaff, verifyToken} from "../middleware/auth.js";
import {
    createBorrowTicket,
    getTicketById,
    getTicketList,
    updateTicketReturnDateById
} from "../controllers/borrowTicket.js";


const router = express.Router();

router.post("/", verifyToken, createBorrowTicket);
router.get("/", verifyToken, getTicketList);
router.get("/:id", verifyToken, getTicketById);
router.patch("/:id",verifyToken, verifyAuthorizationStaff, updateTicketReturnDateById);

export default router;