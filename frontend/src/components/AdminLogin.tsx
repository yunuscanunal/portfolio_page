import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth(); // Hook'tan login fonksiyonunu al

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      // Vite kullandığımız için proxy ayarını kontrol et veya tam URL gir
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        // Backend'den gelen token'ı sisteme kaydet ve yönlendir
        login(data.token);
      } else {
        setError("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
      }
    } catch (err) {
      setError("Sunucu hatası." + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black text-white">
      <div className="p-8 border border-white/10 rounded-xl bg-cyber-gray/50 backdrop-blur-md w-96">
        <h2 className="text-2xl font-mono mb-6 text-cyber-primary text-center">
          ADMIN_ACCESS
        </h2>

        <div className="space-y-4">
          <input
            name="username"
            className="w-full p-3 bg-black/50 border border-white/20 rounded text-white focus:border-cyber-primary outline-none"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            className="w-full p-3 bg-black/50 border border-white/20 rounded text-white focus:border-cyber-primary outline-none"
            placeholder="Password"
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm font-mono">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all font-bold rounded"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
