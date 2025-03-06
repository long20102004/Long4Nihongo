"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  PlusCircle,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateCourse,
  deleteLesson,
  getCourseData,
  addLesson,
} from "@/lib/api";
import CourseAnalyticsChart from "@/components/course-analytics-chart";
import CourseCompletionChart from "@/components/course-completion-chart";

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [editCourseData, setEditCourseData] = useState({});
  const [newLessonData, setNewLessonData] = useState({
    name: "",
    description: "",
    duration: 0,
    courseId: null,
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const { courseId } = params;

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const course = await getCourseData(courseId);
      if (course) {
        setCourse(course);
        setEditCourseData(course);
      } else {
        setError("Course not found");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch course");
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(editCourseData);
      fetchCourse();
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to update course");
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      newLessonData.courseId = courseId;
      await addLesson(newLessonData);
      fetchCourse();
      setShowAddLessonForm(false);
      setNewLessonData({ name: "", description: "", duration: 0 });
    } catch (err) {
      setError("Failed to add lesson");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    setLessonToDelete(lessonId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteLesson = async () => {
    try {
      await deleteLesson(lessonToDelete);
      fetchCourse();
      setShowDeleteConfirmation(false);
      setLessonToDelete(null);
    } catch (err) {
      setError("Failed to delete lesson");
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "course") {
      setEditCourseData((prev) => ({ ...prev, [name]: value }));
    } else if (formType === "lesson") {
      setNewLessonData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Link href="/courses">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold">{course.name}</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowEditForm(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Course
              </Button>
              <Button onClick={() => setShowAddLessonForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Lesson
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Enrolled Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {course.enrollments || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{course.newEnrollments || 0} new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {course.completionRate || 0}%
                </div>
                <Progress
                  value={course.completionRate || 0}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {course.averageRating || 0}/5
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(course.averageRating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {course.totalRatings || 0} ratings
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {course.totalDuration || 0} min
                </div>
                <p className="text-xs text-muted-foreground">
                  {/* Across {course.lessons.length} lessons */}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="content" className="mb-6">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Course Lessons</h3>
                <Button onClick={() => setShowAddLessonForm(true)} size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>
              </div>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <Card key={lesson.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Lesson {index + 1}: {lesson.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/courses/${course.id}/lessons/${lesson.id}`}
                          >
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLesson(lesson.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">
                            {/* {lesson.sections.length} sections */}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{lesson.duration || 0} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-muted-foreground">
                            Completion rate
                          </div>
                          <div className="flex-1">
                            <Progress
                              value={lesson.completionRate || 0}
                              className="h-2"
                            />
                          </div>
                          <div className="text-xs font-medium">
                            {lesson.completionRate || 0}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Trend</CardTitle>
                    <CardDescription>New enrollments over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <CourseAnalyticsChart data={course.enrollmentTrend || []} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Student Progress</CardTitle>
                    <CardDescription>
                      Completion status across all students
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <CourseCompletionChart
                      data={course.studentProgress || []}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Add more analytics components as needed */}
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              {/* Add student management components */}
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              {/* Add course settings components */}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
            <form onSubmit={handleUpdateCourse} className="space-y-4">
              <div>
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editCourseData.name}
                  onChange={(e) => handleInputChange(e, "course")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editCourseData.description}
                  onChange={(e) => handleInputChange(e, "course")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="Image Url">Image Url</Label>
                <Textarea
                  id="imageUrl"
                  name="imageUrl"
                  value={editCourseData.imageUrl}
                  onChange={(e) => handleInputChange(e, "course")}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddLessonForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
            <form onSubmit={handleAddLesson} className="space-y-4">
              <div>
                <Label htmlFor="lessonName">Lesson Name</Label>
                <Input
                  id="lessonName"
                  name="name"
                  value={newLessonData.name}
                  onChange={(e) => handleInputChange(e, "lesson")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lessonDescription">Description</Label>
                <Textarea
                  id="lessonDescription"
                  name="description"
                  value={newLessonData.description}
                  onChange={(e) => handleInputChange(e, "lesson")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lessonDuration">Duration (minutes)</Label>
                <Input
                  id="lessonDuration"
                  name="duration"
                  type="number"
                  value={newLessonData.duration}
                  onChange={(e) => handleInputChange(e, "lesson")}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddLessonForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Lesson</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this lesson? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDeleteLesson}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
