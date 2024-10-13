import classes from "./Course.module.css";
import Dropdown from "../MyTool/DropDown";
import Question from "./Question";
import QuestionManage from "./QuestionManage";
import Header from "../MyTool/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCardManage from "./FlashCardManage";
import LearningContent from "./LearningContent";
export default function Course(props) {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [listLessons, setLessons] = useState([]);
  const [courseContent, setCourseContent] = useState([]);
  const [sectionValid, setSectionValid] = useState("");
  const [sectionId, setSectionId] = useState(-1);
  const [content, setContent] = useState();
  function backMain() {
    window.location.href = "http://localhost:3000/";
  }

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
          throw new Error("Network response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCourse(data);
      })
      .catch((error) => {});

    fetch(`http://localhost:8080/course/${courseId}/lessons`, {
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
      })
      .catch((error) => {
        // handleError(error);
      });
  }, [courseId]);

  useEffect(() => {
    console.log("Section valid:" + sectionValid);
    if (sectionValid === "invalid") {
      setContent(
        <div className={classes.invalidDiv}>
          Hãy đăng nhập và mua khóa để học bài!
        </div>
      );
    } else if (sectionValid === "flashcard") {
      setContent(
        <FlashCardManage
          courseContent={courseContent}
          numberContent={courseContent.length}
        />
      );
    } else if (sectionValid === "content") {
      setContent(
        <LearningContent
          courseContent={courseContent}
          numberContent={courseContent.length}
        />
      );
    } else if (sectionValid === "question") {
      setContent(
        <QuestionManage
          courseContent={courseContent}
          numberContent={courseContent.length}
        />
      );
    }
  }, [courseContent, sectionId, sectionValid]);
  return (
    <div className={classes.container}>
      <Header className={classes.header}></Header>
      <div className={classes.Course}>
        <div className={classes.lesson}>
          <div className={classes.title}>
            <button className={classes.backButton} onClick={backMain}>
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
          <div className={classes.content}>{content}</div>
        </div>
        <div className={classes.lessonList}>
          <div id={classes.courseListName}>
            Course Contents
            {listLessons.map((lesson, id) => (
              <Dropdown
                setSectionId={setSectionId}
                setSectionValid={setSectionValid}
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
    </div>
  );
}
