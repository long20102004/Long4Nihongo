"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  GripVertical,
  PlusCircle,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { analytics } from "@/lib/data";
import LessonCompletionChart from "@/components/lesson-completion-chart";
import { useEffect, useState } from "react";
import {
  getLessonData,
  updateLesson,
  addSection,
  deleteSection,
} from "@/lib/api";

export default function PartPage({ params }) {
  const { courseId, lessonId } = params;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [editLessonData, setEditLessonData] = useState({});
  const [newSectionData, setNewSectionData] = useState({
    name: "",
    description: "",
    lessonId: null,
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const data = await getLessonData(lessonId);
      if (data) {
        setLesson(data);
        setEditLessonData(data);
      } else {
        setError("Lesson not found");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch lesson");
      setLoading(false);
    }
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    try {
      await updateLesson(editLessonData);
      fetchLesson();
      setShowEditForm(false);
    } catch (err) {
      setError("Failed to update lesson");
    }
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    try {
      newSectionData.lessonId = lessonId;
      await addSection(newSectionData);
      fetchLesson();
      setShowAddSectionForm(false);
      setNewSectionData({ name: "", description: "" });
    } catch (err) {
      setError("Failed to add section");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    setSectionToDelete(sectionId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteSection = async () => {
    try {
      await deleteSection(sectionToDelete);
      fetchLesson();
      setShowDeleteConfirmation(false);
      setSectionToDelete(null);
    } catch (err) {
      setError("Failed to delete section");
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "lesson") {
      setEditLessonData((prev) => ({ ...prev, [name]: value }));
    } else if (formType === "section") {
      setNewSectionData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Get part analytics data
  const partAnalytics = analytics.partAnalytics[0] || {
    completionRate: 65,
    averageTimeSpent: 45,
    lessonCompletionRates: [],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader /> */}
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Link href={`/courses/${courseId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold">{lesson.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowEditForm(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Lesson
              </Button>
              <Button onClick={() => setShowAddSectionForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {partAnalytics.completionRate}%
                </div>
                <Progress
                  value={partAnalytics.completionRate}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Time Spent
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {partAnalytics.averageTimeSpent} min
                </div>
                <p className="text-xs text-muted-foreground">Per student</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Content
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lesson.sections.length} sections
                </div>
                <p className="text-xs text-muted-foreground">
                  {lesson.totalDuration || 100} minutes total
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Completion Rates</CardTitle>
                  <CardDescription>
                    Percentage of students completing each section
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <LessonCompletionChart
                    data={partAnalytics.lessonCompletionRates || []}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Status
                    </div>
                    <div
                      className={`font-medium ${
                        lesson.status === "Published"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {lesson.status || "Draft"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </div>
                    <div>{lesson.lastUpdated || "Not available"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Content
                    </div>
                    <div>
                      {lesson.sections.length} sections •{" "}
                      {lesson.totalDuration || 100} minutes
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Student Progress
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={partAnalytics.completionRate}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium">
                        {partAnalytics.completionRate}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Sections</h3>
              <Button onClick={() => setShowAddSectionForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </div>
            <div className="space-y-4">
              {lesson.sections.map((section, index) => (
                <Card key={section.id} className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center px-2 cursor-move">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardHeader className="pl-10 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Section {index + 1}: {section.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          Completion:{" "}
                          {section.completionRate ||
                            Math.floor(Math.random() * 30) + 60}
                          %
                        </div>
                        <Link
                          href={`/courses/${courseId}/lessons/${lesson.id}/sections/${section.id}`}
                        >
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-10">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 text-sm">
                          {section.video && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Video • {section.videoDuration} min
                            </span>
                          )}
                          {section.flashcards > 0 && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {section.flashcards} Flashcards
                            </span>
                          )}
                          {section.questions > 0 && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {section.questions} Questions
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-48">
                        <Progress
                          value={
                            section.completionRate ||
                            Math.floor(Math.random() * 30) + 60
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Lesson</h2>
            <form onSubmit={handleUpdateLesson} className="space-y-4">
              <div>
                <Label htmlFor="name">Lesson Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editLessonData.name}
                  onChange={(e) => handleInputChange(e, "lesson")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editLessonData.description}
                  onChange={(e) => handleInputChange(e, "lesson")}
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

      {showAddSectionForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Section</h2>
            <form onSubmit={handleAddSection} className="space-y-4">
              <div>
                <Label htmlFor="sectionName">Section Name</Label>
                <Input
                  id="sectionName"
                  name="name"
                  value={newSectionData.name}
                  onChange={(e) => handleInputChange(e, "section")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sectionDescription">Description</Label>
                <Textarea
                  id="sectionDescription"
                  name="description"
                  value={newSectionData.description}
                  onChange={(e) => handleInputChange(e, "section")}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddSectionForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Section</Button>
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
              Are you sure you want to delete this section? This action cannot
              be undone.
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
                onClick={confirmDeleteSection}
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
