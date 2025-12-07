import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signupUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser(form)).then((res: any) => {
      if (!res.error) navigate("/dashboard");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow">
          Create Your Account 🚀
        </h2>

        {error && (
          <p className="text-red-300 text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          <div>
            <label className="text-white font-medium">Name</label>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Create a password"
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 mt-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
