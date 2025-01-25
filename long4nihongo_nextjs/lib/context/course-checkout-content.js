"use client";
import { createContext, useContext, useState } from "react";

const CourseCheckOutContext = createContext();

export function CourseCheckOutProvider({ children }) {
  const [choosedCourse, setChoosedCourse] = useState([]);

  return (
    <CourseCheckOutContext.Provider value={{ choosedCourse, setChoosedCourse }}>
      {children}
    </CourseCheckOutContext.Provider>
  );
}
export function useChoosedCourse() {
  return useContext(CourseCheckOutContext);
}
