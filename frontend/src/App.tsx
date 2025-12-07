import Dashboard from "./pages/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-project" element={<CreateProject />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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


      </Routes>
    </BrowserRouter>
  );
}
