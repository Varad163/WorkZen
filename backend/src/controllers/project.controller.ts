import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";
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

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const project = await Project.findOne({ _id: id, user: userId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load project" });
  }
};


export const shareProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Only owner can share project
    if (String(project.user) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const userToShare = await User.findOne({ email });
    if (!userToShare) return res.status(404).json({ message: "User not found" });

    // Prevent duplicate sharing
    if (project.collaborators.includes(userToShare._id)) {
      return res.status(400).json({ message: "User already added" });
    }

    project.collaborators.push(userToShare._id);
    await project.save();

    res.json({ message: "User added successfully", user: userToShare });
  } catch (err) {
    res.status(500).json({ message: "Failed to share project" });
  }
};