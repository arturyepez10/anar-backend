import { Router } from "express";
import { validateBody, validateParams } from "../../middleware/data-validation";
import { createApplicationController, deleteApplicationController, getApplicationsController, updateApplicationController } from "../../controllers/applications";
import { applicationParamSchema, applicationSchema } from "../../validators/applications";
import permissions from "./permissions";
import roles from "./roles";

const router = Router();

// Manage of application information
router.get("/", getApplicationsController);

// Sub-module of application permissions
router.use("/permissions", permissions);

// Sub-module of application roles
router.use("/roles", roles);

router.get(
  "/:id",
  validateParams(applicationParamSchema),
  getApplicationsController
);
router.post(
  "/",
  validateBody(applicationSchema),
  createApplicationController
);
router.put(
  "/:id",
  validateParams(applicationParamSchema),
  updateApplicationController
);
router.delete(
  "/:id",
  validateParams(applicationParamSchema),
  deleteApplicationController
);


export default router;