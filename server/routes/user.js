import express from "express";
import {createUser, deleteUserById, getUserDetailById, listUser, updateUser} from "../controllers/user.js";
import {verifyToken, verifyAuthorizationStaff, verifyAuthorizationManager} from "../middleware/auth.js";

const router = express.Router();
router.use(verifyToken);
router.post("/", verifyAuthorizationManager, createUser);
router.get("/", verifyAuthorizationStaff, listUser);
router.patch("/", verifyAuthorizationManager, updateUser);
router.delete("/:id", verifyAuthorizationManager, deleteUserById);
export default router;