import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProjectAPI } from "../api/api";


const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProjectAPI(form);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-lg border border-white/20 shadow-xl">

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Create New Project 🚀
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Project Title"
            required
            className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="p-3 rounded-xl bg-white/20 text-white border border-white/30 outline-none"
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low" className="text-black">
              Low
            </option>
            <option value="medium" className="text-black">
              Medium
            </option>
            <option value="high" className="text-black">
              High
            </option>
          </select>

          <select
            className="p-3 rounded-xl bg-white/20 text-white border border-white/30 outline-none"
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo" className="text-black">
              To Do
            </option>
            <option value="in-progress" className="text-black">
              In Progress
            </option>
            <option value="completed" className="text-black">
              Completed
            </option>
          </select>

          <input
            type="date"
            className="p-3 rounded-xl bg-white/20 text-white border border-white/30 outline-none"
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />

          <button
            type="submit"
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-xl shadow-lg active:scale-95 transition"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProject;
