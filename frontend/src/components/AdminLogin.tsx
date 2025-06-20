// src/components/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/")}>Home</button>
      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>Invalid username or password</p>}
    </div>
  );
};

export default AdminLogin;
