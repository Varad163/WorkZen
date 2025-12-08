import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      project: projectId,
      assignees: req.body.assignees || [],
      dueDate: req.body.dueDate || null,
      createdBy: req.user.id,          // logged-in user
      status: "todo",
      timeSpent: 0
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
      .populate("assignees", "name email")
      .populate("createdBy", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to load tasks" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;

    if (status === "completed") {
      task.completedAt = new Date();
    }

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};


export const editTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        assignees: req.body.assignees,
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to edit task" });
  }
};

