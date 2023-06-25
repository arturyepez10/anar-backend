import { Router } from "express";
import { healthController } from "../controllers/health";
import auth from "./auth";
import memory from "./memory";

const router = Router();

router.use("/auth", auth);
router.use("/memory", memory);
router.get("/health", healthController);

export default router;