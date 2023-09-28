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
import {
  createKnowledgeController,
  deleteKnowledgeController,
  getKnowledgeController,
  getKnowledgeByIDController,
  updateKnowledgeController,
} from "../controllers/memory/knowledge";

import { validateBody, validateParams } from "../middleware/data-validation";
import { difficultyIdParamSchema, difficultySchema, difficultyUpdateSchema } from "../validators/MemoriaRupestre/difficulty";
import { levelIdParamSchema, levelSchema } from "../validators/MemoriaRupestre/level";
import { cardIdParamSchema, cardSchema, cardUpdateSchema } from "../validators/MemoriaRupestre/card";
import { triviaIdParamSchema, triviaSchema } from "../validators/MemoriaRupestre/trivia";
import { verifyAuth } from "../middleware/authentication";

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
  verifyAuth,
  validateBody(difficultySchema),
  createDifficultyController
);
router.put(
  "/difficulty/:name",
  verifyAuth,
  validateParams(difficultyIdParamSchema),
  validateBody(difficultyUpdateSchema),
  updateDifficultyController
);
router.delete(
  "/difficulty/:name",
  verifyAuth,
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
  verifyAuth,
  validateBody(levelSchema),
  createLevelController
);
router.put(
  "/level/:id",
  verifyAuth,
  validateParams(levelIdParamSchema),
  validateBody(levelSchema),
  updateLevelController
);
router.delete(
  "/level/:id",
  verifyAuth,
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
  verifyAuth,
  validateBody(cardSchema),
  createCardController
);
router.put(
  "/card/:id",
  verifyAuth,
  validateParams(cardIdParamSchema),
  validateBody(cardUpdateSchema),
  updateCardController
);
router.delete(
  "/card/:id",
  verifyAuth,
  validateParams(cardIdParamSchema),
  deleteCardController
);

// Trivia
router.get("/knowledge/", getKnowledgeController);
router.get(
  "/knowledge/:id",
  validateParams(triviaIdParamSchema),
  getKnowledgeByIDController
);
router.post(
  "/knowledge/",
  verifyAuth,
  validateBody(triviaSchema),
  createKnowledgeController
);
router.put(
  "/knowledge/:id",
  verifyAuth,
  validateParams(triviaIdParamSchema),
  validateBody(triviaSchema),
  updateKnowledgeController
);
router.delete(
  "/knowledge/:id",
  verifyAuth,
  validateParams(triviaIdParamSchema),
  deleteKnowledgeController
);

export default router;