import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";

const KanbanPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load project info
  const loadProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Update task status (drag & drop)
  const updateStatus = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/tasks/status/${taskId}`, { status: newStatus });
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProject();
    loadTasks();
    setLoading(false);
  }, []);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{project.title} — Kanban Board</h1>

        <KanbanBoard tasks={tasks} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default KanbanPage;
