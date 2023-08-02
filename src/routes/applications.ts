import { Router } from "express";
import { validateBody, validateParams } from "../middleware/data-validation";
import { createApplicationController, deleteApplicationController, getApplicationsController, updateApplicationController } from "../controllers/applications";
import { applicationParamSchema, applicationSchema } from "../validators/applications";

const router = Router();

// Manage of application information
router.get("/", getApplicationsController);
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