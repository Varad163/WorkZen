import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  // ⭐ Share Modal
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    loadProject();
    loadTasks();
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

  const loadTasks = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
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

  const createTask = async () => {
    if (!newTask.title.trim()) return alert("Task title is required");
    try {
      await api.post(`/tasks/${id}`, newTask);
      setNewTask({ title: "", description: "", dueDate: "" });
      loadTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to create task");
    }
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/tasks/status/${taskId}`, { status: newStatus });
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const saveEditedTask = async () => {
    try {
      await api.put(`/tasks/edit/${editingTask._id}`, editingTask);
      setEditModalOpen(false);
      loadTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  // ⭐ SHARE PROJECT FUNCTION
  const shareProject = async () => {
    if (!shareEmail.trim()) return alert("Enter an email");
    try {
      await api.put(`/projects/share/${id}`, { email: shareEmail });

      alert("Project shared successfully!");
      setShareEmail("");
      setShareModalOpen(false);
      loadProject();
    } catch (err: any) {
      alert(err.response?.data?.msg || "Failed to share project");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">Loading project...</p>
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-600">Project not found ❌</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-xl">
        
        {/* HEADER */}
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

            {/* ⭐ SHARE BUTTON */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Share
            </button>

            <button
              onClick={deleteProject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {/* PRIORITY / STATUS / DEADLINE */}
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

        {/* TASK INPUT */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold mb-4">Add New Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-3 border rounded-lg mb-3"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />

          <textarea
            placeholder="Task Description"
            className="w-full p-3 border rounded-lg mb-3"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full p-3 border rounded-lg mb-3"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />

          <button
            onClick={createTask}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Task
          </button>
        </div>

        {/* TASK LIST */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add one above.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center mb-3"
              >
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.description}</p>

                  {task.dueDate && (
                    <p className="text-sm text-blue-600 mt-1">
                      Due: {task.dueDate.split("T")[0]}
                    </p>
                  )}

                  <button
                    className="text-blue-600 text-sm mt-2"
                    onClick={() => {
                      setEditingTask(task);
                      setEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    className="border p-2 rounded-lg"
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(task._id, e.target.value)
                    }
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    className="text-red-600 text-xl"
                    onClick={() => deleteTask(task._id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EDIT TASK MODAL */}
      {editModalOpen && editingTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border rounded-lg mb-3"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="w-full p-2 border rounded-lg mb-3"
              value={
                editingTask.dueDate
                  ? editingTask.dueDate.split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  dueDate: e.target.value,
                })
              }
            />

            <select
              className="w-full p-2 border rounded-lg mb-3"
              value={editingTask.status}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  status: e.target.value,
                })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={saveEditedTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ SHARE PROJECT MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Share Project</h2>

            <input
              type="email"
              placeholder="Enter email to share"
              className="w-full p-2 border rounded-lg mb-3"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setShareModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={shareProject}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectPage;
