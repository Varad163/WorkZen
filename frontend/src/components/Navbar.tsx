import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">WorkZen</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700">{user?.email}</span>

        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
