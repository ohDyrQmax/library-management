import express from "express";
import {listBook, findBookById, updateBookById, deleteBookById, createBook} from "../controllers/book.js";
import {verifyAuthorizationStaff, verifyToken} from "../middleware/auth.js";

const router = express.Router();

/* read */
router.post("/", verifyToken, verifyAuthorizationStaff, createBook);
router.get("/", listBook);
router.get("/:id", findBookById);
router.patch("/:id", verifyToken, verifyAuthorizationStaff, updateBookById);
router.delete("/:id", verifyToken, verifyAuthorizationStaff, deleteBookById);

export default router;