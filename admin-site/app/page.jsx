"use client";

import { useState, useEffect } from "react";
import { mockData } from "../mockData";
import Courses from "../components/Courses";
import Lessons from "../components/Lessons";
import Sections from "../components/Sections";
import EditForm from "../components/EditForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UserManagement from "../components/UserManagement";
import Login from "../components/Login";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const [data, setData] = useState(mockData);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentView, setCurrentView] = useState("courses");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      const updatedCourse = data.courses.find(
        (course) => course.id === selectedCourse.id
      );
      setSelectedCourse(updatedCourse);
    }
  }, [data, selectedCourse]);

  useEffect(() => {
    if (selectedLesson) {
      const updatedLesson = selectedCourse?.lessons.find(
        (lesson) => lesson.id === selectedLesson.id
      );
      setSelectedLesson(updatedLesson);
    }
  }, [selectedCourse, selectedLesson]);

  const handleEdit = (item, type) => {
    setEditData({ ...item, type });
    setEditMode(true);
  };

  const handleSave = (updatedData) => {
    setData((prevData) => {
      let newData = { ...prevData };
      switch (updatedData.type) {
        case "course":
          newData.courses = newData.courses.map((course) =>
            course.id === updatedData.id ? updatedData : course
          );
          break;
        case "lesson":
          newData.courses = newData.courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) =>
              lesson.id === updatedData.id ? updatedData : lesson
            ),
          }));
          break;
        case "section":
          newData.courses = newData.courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) => ({
              ...lesson,
              sections: lesson.sections.map((section) =>
                section.id === updatedData.id ? updatedData : section
              ),
            })),
          }));
          break;
      }
      return newData;
    });
    setEditMode(false);
    setEditData(null);
  };

  const handleDelete = (id, type) => {
    setData((prevData) => {
      let newData = { ...prevData };
      switch (type) {
        case "course":
          newData.courses = newData.courses.filter(
            (course) => course.id !== id
          );
          setSelectedCourse(null);
          setSelectedLesson(null);
          setSelectedSection(null);
          break;
        case "lesson":
          newData.courses = newData.courses.map((course) => ({
            ...course,
            lessons: course.lessons.filter((lesson) => lesson.id !== id),
          }));
          setSelectedLesson(null);
          setSelectedSection(null);
          break;
        case "section":
          newData.courses = newData.courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) => ({
              ...lesson,
              sections: lesson.sections.filter((section) => section.id !== id),
            })),
          }));
          setSelectedSection(null);
          break;
      }
      return newData;
    });
  };

  const handleAdd = (type) => {
    const newItem = { id: Date.now(), title: `New ${type}`, type };
    if (type === "section") newItem.content = "New content";

    setData((prevData) => {
      let newData = { ...prevData };
      switch (type) {
        case "course":
          newData.courses = [...newData.courses, { ...newItem, lessons: [] }];
          break;
        case "lesson":
          if (selectedCourse) {
            newData.courses = newData.courses.map((course) =>
              course.id === selectedCourse.id
                ? {
                    ...course,
                    lessons: [...course.lessons, { ...newItem, sections: [] }],
                  }
                : course
            );
          }
          break;
        case "section":
          if (selectedLesson) {
            newData.courses = newData.courses.map((course) => ({
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === selectedLesson.id
                  ? { ...lesson, sections: [...lesson.sections, newItem] }
                  : lesson
              ),
            }));
          }
          break;
      }
      return newData;
    });
  };

  const handleLogin = (username, password) => {
    // In a real application, you would validate the credentials against a backend
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="flex">
        <Sidebar setCurrentView={setCurrentView} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {currentView === "users" ? (
              <UserManagement />
            ) : (
              <>
                {editMode ? (
                  <EditForm
                    data={editData}
                    onSave={handleSave}
                    onCancel={() => setEditMode(false)}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-bold text-gray-100">
                        Courses
                      </h2>
                      <Button
                        onClick={() => handleAdd("course")}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                      </Button>
                    </div>
                    <Courses
                      courses={data.courses}
                      onSelect={setSelectedCourse}
                      onEdit={(course) => handleEdit(course, "course")}
                      onDelete={(id) => handleDelete(id, "course")}
                    />
                    {selectedCourse && (
                      <>
                        <div className="flex justify-between items-center mt-8">
                          <h3 className="text-2xl font-bold text-gray-100">
                            Lessons for {selectedCourse.title}
                          </h3>
                          <Button
                            onClick={() => handleAdd("lesson")}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson
                          </Button>
                        </div>
                        <Lessons
                          lessons={selectedCourse.lessons}
                          onSelect={setSelectedLesson}
                          onEdit={(lesson) => handleEdit(lesson, "lesson")}
                          onDelete={(id) => handleDelete(id, "lesson")}
                        />
                      </>
                    )}
                    {selectedLesson && (
                      <>
                        <div className="flex justify-between items-center mt-8">
                          <h4 className="text-xl font-bold text-gray-100">
                            Sections for {selectedLesson.title}
                          </h4>
                          <Button
                            onClick={() => handleAdd("section")}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                          </Button>
                        </div>
                        <Sections
                          sections={selectedLesson.sections}
                          onSelect={setSelectedSection}
                          onEdit={(section) => handleEdit(section, "section")}
                          onDelete={(id) => handleDelete(id, "section")}
                        />
                      </>
                    )}
                    {selectedSection && (
                      <div className="mt-8 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-100">
                            {selectedSection.title}
                          </h3>
                        </div>
                        <div className="border-t border-gray-700">
                          <dl>
                            <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-400">
                                Content
                              </dt>
                              <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                                {selectedSection.content}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="px-4 py-3 bg-gray-800 text-right sm:px-6">
                          <Button
                            onClick={() =>
                              handleEdit(selectedSection, "section")
                            }
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            Edit Section
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
