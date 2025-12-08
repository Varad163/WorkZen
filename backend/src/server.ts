import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";



app.use("/api/tasks", taskRoutes);


app.use("/api/projects", projectRoutes);


dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
