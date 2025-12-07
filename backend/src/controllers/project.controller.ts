import { Request, Response } from "express";
import Project from "../models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const project = await Project.create({
      ...req.body,
      user: userId,
    });

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to load projects" });
  }
};
