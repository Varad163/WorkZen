import Dashboard from "./pages/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import ProjectPage from "./pages/ProjectPage";
import EditProject from "./pages/EditProject";
import KanbanBoard from "./pages/KanbanBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

       
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
          <Route
            path="/project/:id/board"
            element={
              <ProtectedRoute>
                <KanbanBoard />
              </ProtectedRoute>
        }
      />

      </Routes>
    </BrowserRouter>
  );
}
