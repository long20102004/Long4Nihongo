import classes from "./LearningContent.module.css";
export default function LearningContent(props) {
  return (
    <div className={classes.contentBorder}>
      <div className={classes.table}>
        <div className={classes.row}>
          <span className={classes.title}>Hiragana Katakana</span>
          <span className={classes.title}>Kanji</span>
          <span className={classes.title}>Ý nghĩa</span>
        </div>

        {props.courseContent.map((content, index) => (
          <>
            <div className={classes.row} key={content.id}>
              <span>{content.hiragana}</span>
              <span>{content.kanji}</span>
              <span>{content.meaning}</span>
            </div>
          </>
        ))}

        {/* <div className={classes.row}>
          <span>にほんご</span>
          <span>日本語</span>
          <span>Nhật Bản</span>
        </div> */}
      </div>
    </div>
  );
}
