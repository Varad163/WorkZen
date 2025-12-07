import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-600">Project not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-xl">

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-gray-600 mt-2">{project.description}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/edit-project/${id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={deleteProject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="font-semibold">Priority</p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white ${
                project.priority === "high"
                  ? "bg-red-600"
                  : project.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-600"
              }`}
            >
              {project.priority}
            </span>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="font-semibold">Status</p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white ${
                project.status === "completed"
                  ? "bg-green-600"
                  : project.status === "in-progress"
                  ? "bg-blue-600"
                  : "bg-gray-500"
              }`}
            >
              {project.status}
            </span>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="font-semibold">Deadline</p>
            <p className="mt-2">{project.deadline || "No deadline"}</p>
          </div>
        </div>

        {/* Placeholder for tasks (next feature) */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-3">Tasks</h2>
          <p className="text-gray-500">Task system coming next… 🔧</p>
        </div>

      </div>
    </div>
  );
};

export default ProjectPage;
