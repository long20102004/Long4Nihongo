import Question from "./Question";
import classes from "./QuestionManage.module.css";
import React, { useState, useEffect } from "react";
export default function QuestionManage(props) {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [clickedNext, setClickedNext] = useState(false);
  const handleClick = (index) => {
    setSelectedQuestion(index);
  };
  useEffect(() => {
    if (clickedNext) {
      setSelectedQuestion((prev) => (prev + 1) % props.numberContent);
      setClickedNext(false);
    }
  }, [clickedNext]);
  return (
    <div className={classes.questionBorder}>
      <div className={classes.testList}>
        <div className={classes.numberList}>
          {Array.from({ length: props.numberContent }, (_, i) => (
            <div
              className={`${classes.number} ${
                selectedQuestion === i ? classes.bold : classes.blur
              }`}
              key={i}
              onClick={() => handleClick(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className={classes.questionDisplay}>
          {props.courseContent.map(
            (content, index) =>
              index == selectedQuestion && (
                <Question
                  answer1={content.answer1}
                  answer2={content.answer2}
                  answer3={content.answer3}
                  answer4={content.answer4}
                  correctAnswer={content.correctAnswer}
                  key={content.id}
                  question={content.question}
                  idQuestion={selectedQuestion + 1}
                  clickedNext={clickedNext}
                  setClickedNext={setClickedNext}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
