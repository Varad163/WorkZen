import { Router } from "express";
import { 
  createProject, 
  getProjects, 
  getProjectById,
  shareProject
} from "../controllers/project.controller";
import { auth } from "../middleware/authMiddleware";

const router = Router();


router.put("/share/:projectId", auth, shareProject);

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);

export default router;
