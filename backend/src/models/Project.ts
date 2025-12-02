import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  owner: string;
  members: string[];
}

const ProjectSchema = new Schema<IProject>({
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model<IProject>("Project", ProjectSchema);
