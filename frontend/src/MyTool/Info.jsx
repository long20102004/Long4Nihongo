import classes from "./Info.module.css";
export default function Info(children) {
  const clockIcon = "/clock.svg";
  const bookIcon = "/book.svg";
  return (
    <>
      <div className={classes.additionInfo}>
        <img className={classes.icon} src={clockIcon} alt="" />
        <div className={classes.lessonTime}>{children.learningTime} Hour</div>

        <div className={classes.countLessons}>
          {" "}
          <img className={classes.icon} src={bookIcon} alt="" />
          <div className={classes.lessonTime}>
            {children.numberLessons} Lessons
          </div>
        </div>
      </div>
    </>
  );
}
