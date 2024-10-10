import classes from "./CourseShop.module.css";
import CourseCard from "./CourseCard";
import Header from "../MyTool/Header";
import { useState, useEffect } from "react";
export default function CourseShop() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch("http://localhost:8080/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.findingBar}>
        <input
          type="text"
          name=""
          id={classes.textBox}
          placeholder="Search your favourite courses"
        />
      </div>
      <div className={classes.courseList}>
        {courses.map((course, index) => (
          <CourseCard
            courseId={course.id}
            key={course.id}
            imageUrl={course.imageUrl}
            courseName={course.name}
            authorName={course.authorName}
            className={classes.CourseCard}
            learningTime={course.time}
            numberLessons={course.numberLessons}
            price={course.price}
          />
        ))}
      </div>
    </div>
  );
}
