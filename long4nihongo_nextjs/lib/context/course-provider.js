"use client";
import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [myCourseList, setMyCourse] = useState([]);

  return (
    <CourseContext.Provider value={{ myCourseList, setMyCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
export function checkCourse(courseId) {
  const { myCourseList } = useCourses();
  myCourseList.forEach((course) => {
    if (course.id === courseId) {
      return true;
    }
  });
  return false;
}
