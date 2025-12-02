import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: any) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project._id}`)}
      className="p-5 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-gray-600 text-sm mt-1">
        {project.description || "No description"}
      </p>
    </div>
  );
}
