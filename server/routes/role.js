import express from "express";
import {listRole} from "../controllers/role.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, listRole);

export default router;