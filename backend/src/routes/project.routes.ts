import { Router } from "express";
import { 
  createProject, 
  getProjects, 
  getProjectById 
} from "../controllers/project.controller";
import {auth} from "../middleware/authMiddleware";

const router = Router();

// Create a new project
router.post("/", auth, createProject);

// Get all projects of logged-in user
router.get("/", auth, getProjects);

// Get single project by ID
router.get("/:id", auth, getProjectById);

export default router;
