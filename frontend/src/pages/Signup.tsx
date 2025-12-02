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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Name" className="input" 
               onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input type="email" placeholder="Email" className="input" 
               onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password" className="input" 
               onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button disabled={loading} className="btn-primary">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
