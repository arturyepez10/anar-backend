import { Router } from "express";
import { registerController, loginController, confirmEmailController, changePasswordController } from "../controllers/auth";
import { registerSchema, loginSchema } from "../validators";
import { validateBody } from "../middleware/data-validation";

const router = Router();

router.post("/register", validateBody(registerSchema), registerController);
router.post("/login", validateBody(loginSchema), loginController);

export default router;