import { Router } from "express";
import {
  getDifficultiesController,
  gettDifficultyController,
  createDifficultyController,
  updateDifficultyController,
  deleteDifficultyController
} from "../controllers/memory/difficulty";
import { validateBody, validateParams } from "../middleware/data-validation";

const router = Router();

// Difficulty
router.get("/difficulty/", getDifficultiesController);
router.get("/difficulty/:name", gettDifficultyController);
router.post("/difficulty/", createDifficultyController);
router.put("/difficulty/:name", updateDifficultyController);
router.delete("/difficulty/:name", deleteDifficultyController);

// Level


export default router;