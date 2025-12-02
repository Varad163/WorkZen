import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already used" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hash
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
