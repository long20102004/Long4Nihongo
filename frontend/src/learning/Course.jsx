import classes from "./Course.module.css";
import Dropdown from "../MyTool/DropDown";
import Question from "./Question";
import QuestionManage from "./QuestionManage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Course(props) {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [listLessons, setLessons] = useState([]);
  const [courseContent, setCourseContent] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/course/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCourse(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    fetch(`http://localhost:8080/${courseId}/lessons`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLessons(data);
      });
  }, [courseId]);

  return (
    <div className={classes.Course}>
      <div className={classes.lesson}>
        <div className={classes.title}>
          <button className={classes.backButton}>
            <img className={classes.iconSmall} src="/back.svg" alt="" />
          </button>
          <div className={classes.titleName}>
            <div className={classes.lessonBigName}>
              <div>{course.name}</div>
              <img className={classes.icon} src="/setting.svg" alt="" />
            </div>
            <div className={classes.titleAddition}>9 Lessons 6h30 mins</div>
          </div>
        </div>
        <div className={classes.content}>
          <QuestionManage
            courseContent={courseContent}
            numberContent={courseContent.length}
          />
        </div>
      </div>
      <div className={classes.lessonList}>
        <div id={classes.courseListName}>
          Course Contents
          {listLessons.map((lesson, id) => (
            <Dropdown
              setCourseContent={setCourseContent}
              key={id}
              courseId={courseId}
              lessonId={lesson.id}
              lessonName={lesson.name}
              learningTime="10"
              numberLessons="15"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
