import { Router } from "express";
import {
  getDifficultiesController,
  gettDifficultyController,
  createDifficultyController,
  updateDifficultyController,
  deleteDifficultyController
} from "../controllers/memory/difficulty";
import {
  getLevelsController,
  getLevelController,
  createLevelController,
  updateLevelController,
  deleteLevelController
} from "../controllers/memory/level";
import {
  getCardsController,
  getCardController,
  createCardController,
  updateCardController,
  deleteCardController
} from "../controllers/memory/card";

import { validateBody, validateParams } from "../middleware/data-validation";
import { difficultyIdParamSchema, difficultySchema, difficultyUpdateSchema } from "../validators/MemoriaRupestre/difficulty";
import { levelIdParamSchema, levelSchema } from "../validators/MemoriaRupestre/level";
import { cardIdParamSchema, cardSchema, cardUpdateSchema } from "../validators/MemoriaRupestre/card";

const router = Router();

// Difficulty
router.get("/difficulty/", getDifficultiesController);
router.get(
  "/difficulty/:name",
  validateParams(difficultyIdParamSchema),
  gettDifficultyController
);
router.post(
  "/difficulty/",
  validateBody(difficultySchema),
  createDifficultyController
);
router.put(
  "/difficulty/:name",
  validateParams(difficultyIdParamSchema),
  validateBody(difficultyUpdateSchema),
  updateDifficultyController
);
router.delete(
  "/difficulty/:name",
  validateParams(difficultyIdParamSchema),
  deleteDifficultyController
);

// Level
router.get("/level/", getLevelsController);
router.get(
  "/level/:id",
  validateParams(levelIdParamSchema),
  getLevelController
);
router.post(
  "/level/",
  validateBody(levelSchema),
  createLevelController
);
router.put(
  "/level/:id",
  validateParams(levelIdParamSchema),
  validateBody(levelSchema),
  updateLevelController
);
router.delete(
  "/level/:id",
  validateParams(levelIdParamSchema), 
  deleteLevelController
);

// Card
router.get("/card/", getCardsController);
router.get(
  "/card/:id",
  validateParams(cardIdParamSchema),
  getCardController
);
router.post(
  "/card/",
  validateBody(cardSchema),
  createCardController
);
router.put(
  "/card/:id",
  validateParams(cardIdParamSchema),
  validateBody(cardUpdateSchema),
  updateCardController
);
router.delete(
  "/card/:id",
  validateParams(cardIdParamSchema),
  deleteCardController
);

// User-Level

export default router;