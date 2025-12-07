import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";
import {auth} from "../middleware/authMiddleware";

const router = Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);

export default router;
