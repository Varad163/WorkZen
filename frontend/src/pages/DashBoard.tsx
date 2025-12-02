import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import api from "../api/api";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((s) => s.auth);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch projects on load
  useEffect(() => {
    if (!token) return;
    loadProjects();
  }, [token]);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-3">
          Welcome back, {user?.name} 👋
        </h1>

        <button
          onClick={() => navigate("/create-project")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-6"
        >
          Create New Project +
        </button>

        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects yet. Click "Create New Project" to start.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
