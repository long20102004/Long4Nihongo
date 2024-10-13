import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Landing from "./Landing";
import Course from "./learning/Course";
import CourseShop from "./shopping/CourseShop";
<<<<<<< HEAD
import CourseIntroduce from "./shopping/CourseIntroduce";
import Header from "./MyTool/Header";
import Admin from "./admin/Admin";
export default function () {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/course-info/:courseId"
          element={<CourseIntroduce />}
        ></Route>
        <Route path="/" element={<CourseShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/course/:courseId" element={<Course />} />
        <Route
          path="/course-introduce/:courseId"
          element={<CourseIntroduce />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
=======
export default function () {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
    </Routes>
>>>>>>> 942b3ebef7b02279ab2ca308d539e713dab1bdb0
  );
}
