import classes from "./CourseIntroduce.module.css";
import Header from "../MyTool/Header";
import CourseCard from "./CourseCard";
export default function CourseIntroduce() {
  const imageUrls = [
    "./n5course.jpg",
    "./n4course.jpg",
    "./n3course.jpg",
    "./n5course.jpg",
  ];
  return (
    <div className={classes.body}>
      <Header className={classes.customHeader}></Header>
      <div className={classes.courseImageContainer}>
        <div className={classes.courseCard}>
          <img className={classes.courseImage} src="./course.png" alt="" />
          <div className={classes.courseName}>N5 Grammar Advance</div>
          <div className={classes.priceContainer}>
            <div className={classes.price}>$49.65</div>
            <div className={classes.originalPrice}>$99.99</div>
            <div className={classes.priceDiscount}>50% Off</div>
          </div>

          <div className={classes.timeDiscountLeft}>
            11 hour left at this price
          </div>
          <div className={classes.buyButton}>Buy Now</div>
          <hr className={classes.myCustomLine} />
          <div className={classes.courseInformation}>
            <div className={classes.inforTitle}>This Course included</div>
            <div className={classes.infor}>Money back guarentee</div>
            <div className={classes.infor}>Access on all devices</div>
            <div className={classes.infor}>Certification of graduate</div>
            <div className={classes.infor}>32 Modules</div>
          </div>
        </div>
      </div>
      <div className={classes.courseReviewContainer}>
        <div className={classes.courseReview}></div>
      </div>
      <div className={classes.otherCourseContainer}>
        <div className={classes.courseList}>
          {imageUrls.map((url, index) => (
            <CourseCard
              key={index}
              imageUrl={url}
              className={classes.CourseCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
