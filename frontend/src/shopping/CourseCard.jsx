import classes from "./CourseCard.module.css";
import Info from "../MyTool/Info.jsx";
import { useEffect, useState } from "react";
export default function CourseCard(children) {
  const [isSold, setSold] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/check-course/${children.courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setSold(true);
      } else {
        setSold(false);
      }
    });
  });
  function jumpToCourseIntroduce() {
    window.location.href = `http://localhost:3000/course-introduce/${children.courseId}`;
  }
  function jumpToCourse() {
    window.location.href = `http://localhost:3000/course/${children.courseId}`;
  }
  return (
    <div
      className={classes.CourseCard}
      onClick={isSold ? jumpToCourse : jumpToCourseIntroduce}
    >
      <div className={classes.imageContainer}>
        <img
          className={classes.courseCardImage}
          src={children.imageUrl}
          alt=""
        />
      </div>
      <Info
        learningTime={children.learningTime}
        numberLessons={children.numberLessons}
      />{" "}
      <div className={classes.courseName}>{children.courseName}</div>
      <div className={classes.introduction}>
        isSold: {isSold ? "True" : "False"}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
        dolor sit amet
      </div>
      <div className={classes.purchaseInfor}>
        <img className={classes.authorAvatar} src="./avatar.png" alt="" />
        <div className={classes.authorName}>{children.authorName}</div>
        <div className={classes.coursePrice}>{children.price}$</div>
      </div>
    </div>
  );
}
