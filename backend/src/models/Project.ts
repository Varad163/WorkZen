import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  deadline?: Date;
  user: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    deadline: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
