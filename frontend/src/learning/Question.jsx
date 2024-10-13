import classes from "./Question.module.css";
import React, { useState, useEffect } from "react";
export default function Question(props) {
  const [currentId, setCurrentId] = useState(props.idQuestion);
  const [fade, setFade] = useState(false);
  const [answerClicked, setAnswer] = useState();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // State to show correct answer
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => {
        setFade(false);
        props.setClickedNext(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  });
  function checkAnswer(answer) {
    if (clicked) return;
    setAnswer(answer);
    if (answer !== props.correctAnswer) {
      setShowCorrectAnswer(true);
    }
    setClicked(true);
  }
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
          {currentId}. {props.question}
        </div>
        <div className={classes.answerBody}>
          <div
            className={`${classes.answerContainer} ${
              answerClicked === props.answer1
                ? props.correctAnswer === props.answer1
                  ? classes.correctAnswer
                  : classes.wrongAnswer
                : showCorrectAnswer && props.correctAnswer === props.answer1
                ? classes.correctAnswer
                : ""
            }`}
            onClick={() => checkAnswer(props.answer1)}
          >
            <div className={classes.answer}>1. {props.answer1}</div>
          </div>

          <div
            className={`${classes.answerContainer} ${
              answerClicked === props.answer2
                ? props.correctAnswer === props.answer2
                  ? classes.correctAnswer
                  : classes.wrongAnswer
                : showCorrectAnswer && props.correctAnswer === props.answer2
                ? classes.correctAnswer
                : ""
            }`}
            onClick={() => checkAnswer(props.answer2)}
          >
            <div className={classes.answer}>2. {props.answer2}</div>
          </div>

          <div
            className={`${classes.answerContainer} ${
              answerClicked === props.answer3
                ? props.correctAnswer === props.answer3
                  ? classes.correctAnswer
                  : classes.wrongAnswer
                : showCorrectAnswer && props.correctAnswer === props.answer3
                ? classes.correctAnswer
                : ""
            }`}
            onClick={() => checkAnswer(props.answer3)}
          >
            <div className={classes.answer}>3. {props.answer3}</div>
          </div>

          <div
            className={`${classes.answerContainer} ${
              answerClicked === props.answer4
                ? props.correctAnswer === props.answer4
                  ? classes.correctAnswer
                  : classes.wrongAnswer
                : showCorrectAnswer && props.correctAnswer === props.answer4
                ? classes.correctAnswer
                : ""
            }`}
            onClick={() => checkAnswer(props.answer4)}
          >
            <div className={classes.answer}>4. {props.answer4}</div>
          </div>
        </div>
        <div className={classes.submitButton} onClick={handleSubmit}>
          Câu tiếp theo &gt;{" "}
        </div>
      </div>
    </>
  );
}
