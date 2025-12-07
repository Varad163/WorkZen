import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -----------------------------
// PROJECT APIs
// -----------------------------

export const createProjectAPI = (data: any) => {
  return api.post("/projects", data);  // <--- THIS IS CORRECT
};

export const getProjectsAPI = () => api.get("/projects");

export default api;
