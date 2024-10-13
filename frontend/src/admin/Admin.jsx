import { useEffect, useState } from "react";
import classes from "./Admin.module.css";
export default function Admin() {
  const [courses, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [sections, setSections] = useState([]);
  const [content, setContent] = useState([]);
  const [editContent, setEditContent] = useState(null); // State for the section being edited
  const [sectionType, setSectionType] = useState();
  const [sectionId, setSectionId] = useState();
  const [lessonId, setLessonId] = useState();
  const [editSection, setEditSection] = useState(false);
  const [newSection, setNewSection] = useState({
    name: "",
    lessonId: "",
    type: "",
  });
  useEffect(() => {
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((data) => setCourse(data));
  }, [1]);
  function redirectToLogin() {
    window.location.href = "http://localhost:3000/login";
  }
  function getLessonsByCourse(id) {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/course/${id}/lessons`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLessons(data));
  }
  function getSectionByLesson(id) {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/lessons/${id}/sections`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Lesson Id: " + id);
        setLessonId(id);
        setSections(data);
      });
  }
  function getContentBySectionId(id) {
    const token = localStorage.getItem("jwtToken");
    fetch(`http://localhost:8080/section/${id}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setSectionType(data.sectionType);
        setSectionId(id);
        console.log("Receiving section: " + data.sectionType);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    console.log("Sending section:" + JSON.stringify(editContent));
    let url = "";
    if (sectionType === "flashcard")
      url = `http://localhost:8080/edit/section/${sectionId}/add-flash-card`;
    else if (sectionType === "content")
      url = `http://localhost:8080/edit/section/${sectionId}/add-word`;
    else if (sectionType === "question")
      url = `http://localhost:8080/edit/section/${sectionId}/add-question`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editContent),
    });
  };
  function handleSectionSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    newSection.lessonId = lessonId;
    fetch(`http://localhost:8080/edit/lesson/${lessonId}/add-section`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSection),
    });
  }
  const handleSectionInputChange = (e, field) => {
    setNewSection({
      ...newSection,
      [field]: e.target.value,
    });
  };
  const handleInputChange = (e, field) => {
    setEditContent({
      ...editContent,
      [field]: e.target.value,
    });
  };
  return (
    <div className={classes.adminContainer}>
      <button onClick={redirectToLogin}>Login</button>
      <div className={classes.courses}>
        {courses.map((course, index) => (
          <button onClick={() => getLessonsByCourse(course.id)}>
            {" "}
            {course.name}{" "}
          </button>
        ))}
        <button>Add Course</button>
      </div>
      <div className={classes.lessons}>
        {lessons.map((lesson, index) => (
          <button onClick={() => getSectionByLesson(lesson.id)}>
            {lesson.name}
          </button>
        ))}
        <button>Add Lesson</button>
      </div>
      <div className={classes.sections}>
        {sections.map((section, index) => (
          <button onClick={() => getContentBySectionId(section.id)}>
            {section.name}
          </button>
        ))}
        <button onClick={() => setEditSection(!editSection)}>
          Add section
        </button>
        {editSection && (
          <form onSubmit={handleSectionSubmit}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={newSection.name}
                  onChange={(e) => handleSectionInputChange(e, "name")}
                />
              </label>
            </div>
            <div>
              <label>
                Type:
                <input
                  type="text"
                  value={newSection.type}
                  onChange={(e) => handleSectionInputChange(e, "type")}
                />
              </label>
            </div>
            <button type="submit">Save</button>
          </form>
        )}
      </div>
      <div>
        {content.map((section, index) => (
          <div>
            <pre>
              <code>{JSON.stringify(section, null, 2)}</code>
            </pre>
            <button onClick={() => setEditContent(section)}>Edit</button>
            <button onClick={() => setEditContent(section)}>Add Content</button>
          </div>
        ))}
      </div>

      {editContent && (
        <form onSubmit={handleSubmit}>
          {Object.keys(editContent).map((key) => (
            <div key={key}>
              <label>
                {key}:
                <input
                  type="text"
                  value={editContent[key]}
                  onChange={(e) => handleInputChange(e, key)}
                />
              </label>
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
