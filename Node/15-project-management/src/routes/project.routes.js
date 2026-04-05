import { Router } from "express";
import {
  addMembersToProject,
  createProject,
  deleteMember,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMembersToProjectValidator,
} from "../validators/index.js";
import {
  verifyJWT,
  verifyProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router.get("/", getProjects);
router.post("/", createProjectValidator(), validate, createProject);
router.get(
  "/:projectId",
  verifyProjectPermission(AvailableUserRole),
  getProjectById,
);
router.put(
  "/:projectId",
  verifyProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
  createProjectValidator(),
  validate,
  updateProject,
);
router.delete(
  "/:projectId",
  verifyProjectPermission([UserRolesEnum.ADMIN]),
  deleteProject,
);
router.get("/:projectId/members", getProjectMembers);
router.post(
  "/:projectId/members",
  verifyProjectPermission([UserRolesEnum.ADMIN]),
  addMembersToProjectValidator(),
  validate,
  addMembersToProject,
);
router.put(
  "/:projectId/members/:userId",
  verifyProjectPermission([UserRolesEnum.ADMIN]),
  updateMemberRole,
);
router.delete(
  "/:projectId/members/:userId",
  verifyProjectPermission([UserRolesEnum.ADMIN]),
  deleteMember,
);

export default router;
