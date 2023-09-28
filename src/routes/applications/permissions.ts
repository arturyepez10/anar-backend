import { Router } from "express";
import { validateBody, validateParams } from "../../middleware/data-validation";
import { createPermissionController, deletePermissionController, getPermissionController, getPermissionsController, updatePermissionController } from "../../controllers/applications/permissions";

const router = Router();

// Manage of permissions for applications
router.get("/", getPermissionsController);
router.get("/:name", getPermissionController);
router.post("/", createPermissionController);
router.put("/:name", updatePermissionController);
router.delete("/:name", deletePermissionController);

export default router;