import { Router } from "express";
import { healthController } from "../controllers/health";
import auth from "./auth";
import memory from "./memory";
import applications from "./applications";

const router = Router();

router.use("/auth", auth);
router.use("/applications", applications);
router.use("/memory", memory);
router.get("/health", healthController);

export default router;