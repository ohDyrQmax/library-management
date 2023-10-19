import express from "express";
import {verifyAuthorizationStaff, verifyToken} from "../middleware/auth.js";
import {
    createBorrowTicket,
    getTicketByUserId,
    getTicketList,
    updateTicketReturnDateById
} from "../controllers/borrowTicket.js";


const router = express.Router();

router.post("/", verifyToken, createBorrowTicket);
router.get("/", verifyToken, verifyAuthorizationStaff, getTicketList);
router.get("/id", verifyToken, getTicketByUserId);
router.patch("/:id",verifyToken, updateTicketReturnDateById);

export default router;