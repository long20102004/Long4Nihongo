import classes from "./CourseIntroduce.module.css";
import Header from "../MyTool/Header";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function CourseIntroduce() {
  const { courseId } = useParams();
  const [courseInfor, setCourseInfor] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8080/course/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not oaak!");
        }
        return response.json();
      })
      .then((data) => {
        setCourseInfor(data);
      });
  }, [courseId]);
  const imageUrls = [
    "/n5course.jpg",
    "/n4course.jpg",
    "/n3course.jpg",
    "/n5course.jpg",
  ];
  return (
    <div className={classes.body}>
      <Header className={classes.customHeader}></Header>
      <div className={classes.courseImageContainer}>
        <div className={classes.courseCard}>
          <img className={classes.courseImage} src="/class1.jpg" alt="" />
          <div className={classes.courseName}>{courseInfor.name}</div>
          <div className={classes.priceContainer}>
            <div className={classes.price}>${courseInfor.price}</div>
            <div className={classes.originalPrice}>
              ${courseInfor.price * 2}
            </div>
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
            <div className={classes.infor}>
              {courseInfor.numberLessons} Modules
            </div>
          </div>
        </div>
      </div>
      <div className={classes.courseReviewContainer}>
        <div className={classes.courseReview}></div>
      </div>
      <div className={classes.otherCourseContainer}>
        <div className={classes.courseList}>
          {/* {imageUrls.map((url, index) => (
            <CourseCard
              key={index}
              imageUrl={url}
              className={classes.CourseCard}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
