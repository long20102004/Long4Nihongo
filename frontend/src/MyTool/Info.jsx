import classes from "./Info.module.css";
export default function Info(children) {
  const clockIcon = "/clock.svg";
  const bookIcon = "/book.svg";
  return (
    <>
      <div className={classes.additionInfo}>
        <div>
          <img className={classes.icon} src={clockIcon} alt="" />
          <div className={classes.lessonTime}>{children.learningTime} Hour</div>
        </div>
        <div>
          <img className={classes.icon} src={bookIcon} alt="" />
          <div className={classes.lessonTime}>
            {children.numberLessons} Lessons
          </div>
        </div>
      </div>
      {/* <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className={classes.icon} src={clockIcon} alt="" />
          <div style={{ padding: "5px" }}>{children.learningTime} Hour</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className={classes.icon} src={bookIcon} alt="" />
          <div style={{ padding: "5px" }}>{children.numberLessons} Lessons</div>
        </div>
      </div> */}
    </>
  );
}
