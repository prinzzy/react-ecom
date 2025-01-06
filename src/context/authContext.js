import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../api"; // Import API functions

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token to get user info
      setUser({ id: decoded.id, email: decoded.email });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const data = await registerUser(email, password);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
