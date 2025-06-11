// src/components/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Giriş başarısız");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Hatalı kullanıcı adı veya şifre");
    }
  };

  return (
    <div>
      <h2>Admin Giriş</h2>
      <input
        name="username"
        onChange={handleChange}
        placeholder="Kullanıcı Adı"
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Şifre"
      />
      <button onClick={handleLogin}>Giriş Yap</button>
      <button onClick={() => navigate("/")}>Anasayfa</button> {/* ⬆️ */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;

<button onClick={() => (window.location.href = "/")}>Anasayfa</button>;
