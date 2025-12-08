import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      const p = res.data;

      setForm({
        title: p.title,
        description: p.description,
        priority: p.priority,
        status: p.status,
        deadline: p.deadline ? p.deadline.split("T")[0] : "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async () => {
    try {
      await api.put(`/projects/${id}`, form);
      navigate(`/project/${id}`);
    } catch (err) {
      console.log(err);
      alert("Failed to update project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">

        <h1 className="text-3xl font-bold mb-6">Edit Project ✏️</h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Project Title"
            className="p-3 border rounded-lg"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Project Description"
            className="p-3 border rounded-lg"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>

          <select
            className="p-3 border rounded-lg"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="p-3 border rounded-lg"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            className="p-3 border rounded-lg"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />

          <button
            onClick={updateProject}
            className="px-4 py-3 bg-indigo-600 text-white rounded-lg mt-4 hover:bg-indigo-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditProject;
