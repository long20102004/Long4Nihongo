import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedLoginState = localStorage.getItem("isLogin");
  console.log("Initial savedLoginState:", savedLoginState); // Debugging log
  const [isLogin, setLogin] = useState(() => {
    const savedLoginState = localStorage.getItem("isLogin");
    return savedLoginState === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
