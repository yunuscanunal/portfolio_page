// src/components/AdminLogin.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../App";
import Spinner from "./Spinner";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useContext(LangContext);
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

      if (!res.ok) throw new Error("Giriş başarısız");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Hatalı kullanıcı adı veya şifre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{t("login")}</h2>
      <input
        name="username"
        onChange={handleChange}
        placeholder={t("username")}
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder={t("password")}
      />
      <button onClick={handleLogin}>{t("login")}</button>
      <button onClick={() => navigate("/")}>{t("home")}</button>
      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>{t("loginError")}</p>}
    </div>
  );
};

export default AdminLogin;
