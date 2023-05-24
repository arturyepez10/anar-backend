import { Router } from "express";
import { registerController, loginController, confirmEmailController, changePasswordController } from "../controllers/auth";
import { registerSchema, loginSchema, confirmEmailSchemaBody, confirmEmailSchemaParams, changePasswordSchema } from "../validators";
import { validateBody, validateParams } from "../middleware/data-validation";

const router = Router();

router.post("/register", validateBody(registerSchema), registerController);
router.post("/login", validateBody(loginSchema), loginController);
router.post("/confirm-email", validateParams(confirmEmailSchemaParams), validateBody(confirmEmailSchemaBody), confirmEmailController);
router.post("/change-password", validateBody(changePasswordSchema), changePasswordController)

export default router;