import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Cek token dan user saat aplikasi dimuat
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get("/auth/verify");
          setUser(response.data.user);
          setSessionExpired(false);
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Auto logout setelah periode tertentu tidak aktif
  useEffect(() => {
    let inactivityTimer;
    let sessionCheckInterval;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, 30 * 60 * 1000); // 30 menit
    };

    const checkSession = async () => {
      try {
        await axiosInstance.get("/auth/verify");
        setSessionExpired(false);
      } catch (error) {
        setSessionExpired(true);
        handleLogout();
      }
    };

    if (user) {
      // Pasang event listeners
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keypress", resetTimer);
      resetTimer();

      // Cek session setiap 5 menit
      sessionCheckInterval = setInterval(checkSession, 5 * 60 * 1000);

      return () => {
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keypress", resetTimer);
        clearTimeout(inactivityTimer);
        clearInterval(sessionCheckInterval);
      };
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setSessionExpired(true);

    // Panggil endpoint logout di backend
    axiosInstance.post("/auth/logout").catch(console.error);

    window.location.href = "/login";
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.user) {
        setUser(response.user);
        localStorage.setItem("token", response.token);
        setSessionExpired(false);
        return response;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await registerUser(email, password);
      if (response.user) {
        setUser(response.user);
        localStorage.setItem("token", response.token);
        setSessionExpired(false);
        return response;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout: handleLogout,
        register,
        sessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
