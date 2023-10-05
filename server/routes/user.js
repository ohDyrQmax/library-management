import express from "express";
import {createUser, getUserDetailById, listUser, updateUser} from "../controllers/user.js";
import {verifyToken, verifyAuthorizationStaff, verifyAuthorizationManager} from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, verifyAuthorizationManager, createUser);
router.get("/", verifyToken, verifyAuthorizationStaff, listUser);
router.get("/:id", verifyToken, verifyAuthorizationStaff, getUserDetailById);
router.patch("/:id", verifyToken, verifyAuthorizationManager,updateUser);
export default router;