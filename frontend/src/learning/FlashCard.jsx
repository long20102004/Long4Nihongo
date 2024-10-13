import { useState } from "react";
import classes from "./FlashCard.module.css";
export default function FlashCard(props) {
  const [isFlipped, setFlipped] = useState(false);
  function handleClick() {
    setFlipped(!isFlipped);
  }
  return (
    <div
      className={`${classes.flashCardBody} ${
        isFlipped ? classes.isFlipped : ""
      }`}
      onClick={handleClick}
    >
      <div className={classes.jpWord}>
        <div className={classes.mainWord}>{props.content.word}</div>
        <div className={classes.additionalWord}>
          <span>Example</span>
          <span>{props.content.example} </span>
        </div>
      </div>
      <div className={classes.meaning}> {props.content.meaning} </div>
    </div>
  );
}
