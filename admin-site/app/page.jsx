"use client";

import { useEffect, useState } from "react";
import { useCourseManagement } from "../hooks/useCourseManagement";
import { CourseList } from "../components/CourseList";
import { LessonList } from "../components/LessonList";
import { SectionList } from "../components/SectionList";
import { SectionContent } from "../components/SectionContent";
import EditForm from "../components/EditForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UserManagement from "../components/UserManagement";
import Login from "../components/Login";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiFetch } from "@/lib/api-fetch";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("courses");
  const [isLoading, setIsLoading] = useState(true);

  const {
    courses,
    selectedCourse,
    selectedLesson,
    selectedSection,
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
    fetchCourses,
  } = useCourseManagement();

  useEffect(() => {
    apiFetch("auth/user", {
      method: "POST",
    }).then((data) => {
      if (!data.ok) {
        localStorage.setItem("active", 0);
      }
    });
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isActive = localStorage.getItem("active");
      if (isActive === "1") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      await fetchCourses();
      setIsLoading(false);
    };

    if (isLoggedIn) {
      loadCourses();
    }
  }, [isLoggedIn, fetchCourses]);

  const handleLogout = () => {
    localStorage.removeItem("active");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header onLogout={handleLogout} />
      <div className="flex">
        <Sidebar setCurrentView={setCurrentView} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {currentView === "users" ? (
              <UserManagement />
            ) : (
              <>
                <CourseList
                  courses={courses}
                  newCourse={newCourse}
                  onAddCourse={handleAddCourse}
                  onSaveNewCourse={handleSaveNewItem}
                  onSetNewCourse={setNewCourse}
                  onSelectCourse={setSelectedCourse}
                  onEditCourse={(course) => handleEdit(course, "course")}
                  onDeleteCourse={(id) => handleDelete(id, "course")}
                />
                <LessonList
                  selectedCourse={selectedCourse}
                  newLesson={newLesson}
                  onAddLesson={handleAddLesson}
                  onSaveNewLesson={handleSaveNewItem}
                  onSetNewLesson={setNewLesson}
                  onSelectLesson={setSelectedLesson}
                  onEditLesson={(lesson) => handleEdit(lesson, "lesson")}
                  onDeleteLesson={(id) => handleDelete(id, "lesson")}
                />
                <SectionList
                  selectedLesson={selectedLesson}
                  newSection={newSection}
                  onAddSection={handleAddSection}
                  onSaveNewSection={handleSaveNewItem}
                  onSetNewSection={setNewSection}
                  onSelectSection={setSelectedSection}
                  onEditSection={(section) => handleEdit(section, "section")}
                  onDeleteSection={(id) => handleDelete(id, "section")}
                />
                <SectionContent
                  selectedSection={selectedSection}
                  onEdit={handleEdit}
                  onContentEdit={handleSectionContentEdit}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
