"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { apiFetch } from "../api-fetch";
import { useCourses } from "@/lib/context/course-provider";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setMyCourse } = useCourses();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await apiFetch("api/user", {
          method: "POST",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.log("not");
        }
      } catch (error) {
        localStorage.setItem("active", 0);
        localStorage.setItem("crs", null);
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
      localStorage.setItem("active", 1);
    } else {
      throw new Error("Login failed");
    }
  };

  const signup = async (name, username, password) => {
    const response = await apiFetch("api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password }),
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      console.log("failed");
      throw new Error("Signup failed");
    }
  };
  const logout = async () => {
    try {
      await apiFetch("api/logout", {
        method: "POST",
      });
      localStorage.setItem("active", 0);
      localStorage.setItem("crs", null);
      setUser(null);
      router.push("/");
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
