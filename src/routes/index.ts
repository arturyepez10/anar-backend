import { Router } from "express";
import { healthController } from "../controllers/health";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);
router.get("/health", healthController);

export default router;