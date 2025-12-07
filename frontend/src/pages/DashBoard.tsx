import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import api from "../api/api";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((s) => s.auth);

  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (token) loadProjects();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">

      <Navbar />

      <div className="max-w-6xl mx-auto mt-12 p-4">

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your projects, track progress, and stay organized.
        </p>

        <button
          onClick={() => navigate("/create-project")}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-xl shadow-lg active:scale-95"
        >
          + Create New Project
        </button>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
          Your Projects
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading your projects...</p>
        ) : projects.length === 0 ? (
          
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg mt-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 mb-6">
              Start building something amazing today.
            </p>
            <button
              onClick={() => navigate("/create-project")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-xl shadow-lg active:scale-95"
            >
              Create Your First Project
            </button>
          </div>

        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-4">
            {projects.map((p, i) => (
              <div
                key={p._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}
