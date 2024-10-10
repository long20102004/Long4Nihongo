import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Landing from "./Landing";
import Course from "./learning/Course";
import CourseShop from "./shopping/CourseShop";
export default function () {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}
