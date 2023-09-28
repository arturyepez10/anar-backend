import { Router } from "express";
import { validateBody, validateParams } from "../../middleware/data-validation";
import { getApplicationRoleController, getApplicationRolesController, createApplicationRoleController, updateApplicationRoleController, deleteApplicationRoleController } from "../../controllers/applications/roles";

const router = Router();

// Manage of the application permissions
router.get("/", getApplicationRolesController);
router.get("/:role", getApplicationRoleController);
router.post("/", createApplicationRoleController);
router.put("/:role", updateApplicationRoleController);
router.delete("/:role", deleteApplicationRoleController);

export default router;