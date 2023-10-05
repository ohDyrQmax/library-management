import express from "express";
import { listCategory, findCategoryById } from "../controllers/category.js";

const router = express.Router();

router.get("/", listCategory);
router.get("/:id", findCategoryById);

export default router;