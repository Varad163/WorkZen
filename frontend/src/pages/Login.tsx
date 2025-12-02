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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" className="input"
               onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password" className="input"
               onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button disabled={loading} className="btn-primary">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="mt-3">
        New user? <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
