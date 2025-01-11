"use client";
import { createContext, useContext, useState } from "react";

const LessonsContext = createContext();

export function LessonsProvider({ children }) {
  const [dataList, setData] = useState([]);

  return (
    <LessonsContext.Provider value={{ dataList, setData }}>
      {children}
    </LessonsContext.Provider>
  );
}

export function useLessons() {
  return useContext(LessonsContext);
}
