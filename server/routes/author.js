import express from "express";
import {findAuthorById, listAuthor} from "../controllers/author.js";
import {verifyAuthorizationStaff, verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/", listAuthor);
router.get("/:id", findAuthorById);

export default router;