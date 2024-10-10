import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./login/UseAuth";
import Login from "./login/Login";
import Register from "./login/Register";
import Course from "./learning/Course";
import CourseShop from "./shopping/CourseShop";
import CourseIntroduce from "./shopping/CourseIntroduce";
import Header from "./MyTool/Header";
export default function () {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/course-info" element={<CourseIntroduce />}></Route>
        <Route path="/" element={<CourseShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/course/:courseId" element={<Course />} />
      </Routes>
    </AuthProvider>
  );
}
