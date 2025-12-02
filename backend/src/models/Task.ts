import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  project: Types.ObjectId;     // FIXED
  assignees: Types.ObjectId[]; // FIXED
  dueDate?: Date;
  createdBy: Types.ObjectId;   // FIXED
  status: string;
  completedAt?: Date;
  timeSpent: number;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,

  project: { type: Schema.Types.ObjectId, ref: "Project" },

  assignees: [
    { type: Schema.Types.ObjectId, ref: "User" }
  ],

  dueDate: Date,

  createdBy: { type: Schema.Types.ObjectId, ref: "User" },

  status: String,

  completedAt: Date,

  timeSpent: { type: Number, default: 0 }
});

export default mongoose.model<ITask>("Task", TaskSchema);
