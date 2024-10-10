import classes from "./CourseCard.module.css";
import Info from "../MyTool/Info.jsx";
export default function CourseCard(children) {
  function jumpToLesson() {
    window.location.href = `http://localhost:3000/course/${children.courseId}`;
  }
  return (
    <div className={classes.CourseCard} onClick={jumpToLesson}>
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
