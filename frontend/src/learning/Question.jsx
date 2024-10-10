import classes from "./Question.module.css";
import React, { useState, useEffect } from "react";
export default function Question({
  idQuestion,
  clickedNext,
  setClickedNext,
  content,
}) {
  const [currentId, setCurrentId] = useState(idQuestion);
  const [fade, setFade] = useState(false);
  const [questionData, setQuestionData] = useState("");
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   setCurrentId(idQuestion);
  //   fetch(`http://localhost:8080/questions/${idQuestion}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(token);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setQuestionData(data.question);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.error("Fetch error:", error);
  //     });
  // }, [currentId, handleSubmit]);

  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => {
        setFade(false);
        setClickedNext(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  });

  function handleSubmit() {
    setFade(true);
  }

  return (
    <>
      <div
        className={`${classes.body} ${
          fade === true ? classes.fade : classes.notFade
        }`}
      >
        <div className={classes.list}></div>
        <div className={classes.question}>
          {currentId}. {content}
        </div>
        <div className={classes.answerBody}>
          <div className={classes.answerContainer}>
            <div className={classes.answer}>1. いちじん</div>
          </div>
          <div className={classes.answerContainer}>
            <div className={classes.answer}>1. いちじん</div>
          </div>
          <div className={classes.answerContainer}>
            <div className={classes.answer}>1. いちじん</div>
          </div>
          <div className={classes.answerContainer}>
            <div className={classes.answer}>1. いちじん</div>
          </div>
        </div>
        <div className={classes.submitButton} onClick={handleSubmit}>
          Câu tiếp theo &gt;{" "}
        </div>
      </div>
    </>
  );
}
