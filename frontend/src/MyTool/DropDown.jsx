import React, { useEffect, useState } from "react";
import classes from "./DropDown.module.css";
import Info from "./Info";
export default function Dropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listSection, setSection] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/lessons/${props.lessonId}/sections`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSection(data);
      });
  }, [props.lessonId]);

  function callSectionContent(sectionId) {
    props.setSectionId(sectionId);
    fetch(`http://localhost:8080/section/${sectionId}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          props.setSectionValid("invalid");
          console.log(response.status);
          throw new Error("Response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        props.setCourseContent(data.content);
        console.log(data.content);
        props.setSectionValid(data.sectionType);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div
        className={`${classes.dropdown} ${dropdownOpen ? classes.open : ""}`}
      >
        <div id={classes.lessonName} onClick={toggleDropdown}>
          <div className={classes.name}>{props.lessonName}</div>
          <Info
            learningTime={props.learningTime}
            numberLessons={props.numberLessons}
          />
        </div>
        <div
          className={`${classes.dropdownContent} ${
            dropdownOpen ? classes.open : ""
          }`}
        >
          {listSection.map((section, index) => (
            <div key={section.id}>
              <hr className={classes.customLine}></hr>
              <div onClick={() => callSectionContent(section.id)}>
                {section.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
