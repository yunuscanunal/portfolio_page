// src/hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  });
  const [loading] = useState(false);
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return { isAuthenticated, loading, login, logout };
};
