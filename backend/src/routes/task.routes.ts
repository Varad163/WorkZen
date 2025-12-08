import { Router } from "express";
import {auth} from "../middleware/authMiddleware";

import {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask
} from "../controllers/task.controller";

const router = Router();

router.post("/:projectId", auth, createTask);
router.get("/:projectId", auth, getTasksByProject);
router.put("/status/:taskId", auth, updateTaskStatus);
router.delete("/:taskId", auth, deleteTask);

export default router;
