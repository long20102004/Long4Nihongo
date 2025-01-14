"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../api-fetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        console.log("sent");
        const response = await apiFetch("api/user", {
          method: "POST",
        });
        console.log("Response status:", response.status);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log("logged");
        } else {
          console.log("not");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (username, password) => {
    const response = await apiFetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      throw new Error("Login failed");
    }
  };
  const signup = async (name, username, password) => {
    try {
      const response = await apiFetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw error;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const logout = async () => {
    try {
      await apiFetch("api/logout", {
        method: "POST",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
