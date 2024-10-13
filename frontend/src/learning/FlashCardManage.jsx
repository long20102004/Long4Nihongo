import classes from "./FlashCardManage.module.css";
import FlashCard from "./FlashCard";
import { useState } from "react";
export default function FlashCardManage(props) {
  const [currentFlashCard, setCurrentFlashCard] = useState(0);
  function jumpNext() {
    if (currentFlashCard < props.numberContent - 1) {
      setCurrentFlashCard(currentFlashCard + 1);
    }
  }
  function jumpBack() {
    if (currentFlashCard > 0) {
      setCurrentFlashCard(currentFlashCard - 1);
    }
  }
  return (
    <div className={classes.flashCardsContainer}>
      {props.courseContent.map(
        (content, index) =>
          index == currentFlashCard && (
            <div className={classes.flashCard}>
              <FlashCard content={content} />
            </div>
          )
      )}
      <div className={classes.flashCardButton}>
        <div className={classes.backButton} onClick={jumpNext}>
          Next
        </div>
        <div className={classes.nextButton} onClick={jumpBack}>
          Back
        </div>
      </div>
    </div>
  );
}
