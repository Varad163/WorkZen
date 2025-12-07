import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res: any) => {
      if (!res.error) navigate("/dashboard");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-300 text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          <div>
            <label className="text-white font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-indigo-300 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-indigo-300 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-white/80">
          New user?{" "}
          <Link to="/signup" className="text-white font-semibold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
