import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  project: string;
  assignees: string[];
  dueDate?: Date;
  createdBy: string;
  status: string;
  completedAt?: Date;
  timeSpent: number;
}

const TaskSchema = new Schema<ITask>({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dueDate: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: String,
  completedAt: Date,
  timeSpent: { type: Number, default: 0 }
});

export default mongoose.model<ITask>("Task", TaskSchema);
