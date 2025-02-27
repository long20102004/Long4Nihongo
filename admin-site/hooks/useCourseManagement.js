import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api-fetch";

export function useCourseManagement() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newCourse, setNewCourse] = useState(null);
  const [newLesson, setNewLesson] = useState(null);
  const [newSection, setNewSection] = useState(null);

  useEffect(() => {
    apiFetch("admin/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      console.log("course: " + selectedCourse.id);
      const updatedCourse = courses.find(
        (course) => course.id === selectedCourse.id
      );
      setSelectedCourse(updatedCourse);
    }
  }, [courses, selectedCourse]);

  useEffect(() => {
    if (selectedLesson) {
      console.log("lesson: " + selectedLesson.id);
      const updatedLesson = selectedCourse?.lessons.find(
        (lesson) => lesson.id === selectedLesson.id
      );
      setSelectedLesson(updatedLesson);
    }
  }, [selectedCourse, selectedLesson]);

  useEffect(() => {
    if (selectedSection) {
      console.log("section: " + selectedSection.id);
      const updatedSection = selectedLesson?.sections.find(
        (section) => section.id === selectedSection.id
      );
      setSelectedLesson(updatedSection);
    }
  }, [selectedSection, selectedLesson]);

  const handleEdit = (updatedData, type) => {
    let url = "";
    switch (type) {
      case "course":
        url = "admin/update-course";
        setCourses(
          courses.map((course) =>
            course.id === updatedData.id ? updatedData : course
          )
        );
        break;
      case "lesson":
        url = "admin/update-lesson";
        setCourses(
          courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) =>
              lesson.id === updatedData.id ? updatedData : lesson
            ),
          }))
        );
        break;
      case "section":
        url = "admin/update-section";
        setCourses(
          courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) => ({
              ...lesson,
              sections: lesson.sections.map((section) =>
                section.id === updatedData.id ? updatedData : section
              ),
            })),
          }))
        );
        break;
    }
    console.log(updatedData.id);
    apiFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    setEditMode(false);
    setEditData(null);
  };

  const handleDelete = (id, type) => {
    setCourses((prevData) => {
      let newData = [...prevData];
      switch (type) {
        case "course":
          newData = newData.filter((course) => course.id !== id);
          setSelectedCourse(null);
          setSelectedLesson(null);
          setSelectedSection(null);
          apiFetch(`admin/delete-course/${id}`, {
            method: "DELETE",
          });
          break;
        case "lesson":
          newData = newData.map((course) => ({
            ...course,
            lessons: course.lessons.filter((lesson) => lesson.id !== id),
          }));
          setSelectedLesson(null);
          setSelectedSection(null);
          apiFetch(`admin/delete-lesson/${id}`, {
            method: "DELETE",
          });
          break;
        case "section":
          newData = newData.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) => ({
              ...lesson,
              sections: lesson.sections.filter((section) => section.id !== id),
            })),
          }));
          setSelectedSection(null);
          apiFetch(`admin/delete-section/${id}`, {
            method: "DELETE",
          });
          break;
      }
      return newData;
    });
  };

  const handleAddCourse = () => {
    setNewCourse({
      name: "",
      price: "",
      course_img_url: "",
      description: "",
    });
  };

  const handleAddLesson = () => {
    setNewLesson({ name: "", imgUrl: "", courseId: "" });
  };

  const handleAddSection = () => {
    setNewSection({ name: "", imgUrl: "", lessonId: "" });
  };

  const handleSaveNewItem = (type, item) => {
    switch (type) {
      case "course":
        if (
          item.name.trim() === "" ||
          isNaN(parseFloat(item.price)) ||
          item.price.trim() === ""
        ) {
          alert("Please enter a valid name and price for the course.");
          return;
        }
        setCourses([
          ...courses,
          {
            ...item,
            lessons: [],
            price: parseFloat(item.price),
          },
        ]);
        apiFetch("admin/add-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        // setNewCourse(null);
        break;
      case "lesson":
        if (item.name.trim() === "") {
          alert("Please enter a valid name for the lesson.");
          return;
        }
        setCourses(
          courses.map((course) =>
            course.id === selectedCourse.id
              ? {
                  ...course,
                  lessons: [...course.lessons, { ...item, sections: [] }],
                }
              : course
          )
        );
        console.log(item);
        apiFetch("admin/add-lesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        // setNewLesson(null);
        break;
      case "section":
        if (item.name.trim() === "") {
          alert("Please enter a valid name for the section.");
          return;
        }
        setCourses(
          courses.map((course) =>
            course.id === selectedCourse.id
              ? {
                  ...course,
                  lessons: course.lessons.map((lesson) =>
                    lesson.id === selectedLesson.id
                      ? {
                          ...lesson,
                          sections: [
                            ...lesson.sections,
                            { ...item, id: Date.now() },
                          ],
                        }
                      : lesson
                  ),
                }
              : course
          )
        );

        apiFetch("admin/add-section", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        // setNewSection(null);
        break;
    }
    // window.location.reload();
  };

  const handleSectionContentEdit = (type, content) => {
    setCourses((prevData) => {
      let newData = [...prevData];
      newData = newData.map((course) => ({
        ...course,
        lessons: course.lessons.map((lesson) => ({
          ...lesson,
          sections: lesson.sections.map((section) =>
            section.id === selectedSection.id
              ? { ...section, [type]: content }
              : section
          ),
        })),
      }));
      return newData;
    });
  };

  return {
    courses,
    selectedCourse,
    selectedLesson,
    selectedSection,
    editMode,
    editData,
    newCourse,
    newLesson,
    newSection,
    setSelectedCourse,
    setSelectedLesson,
    setSelectedSection,
    handleEdit,
    handleDelete,
    handleAddCourse,
    handleAddLesson,
    handleAddSection,
    handleSaveNewItem,
    handleSectionContentEdit,
    setNewCourse,
    setNewLesson,
    setNewSection,
    setEditMode,
  };
}
