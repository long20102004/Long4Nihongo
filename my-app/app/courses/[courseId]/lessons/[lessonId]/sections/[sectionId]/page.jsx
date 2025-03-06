"use client";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Save,
  Video,
  BarChart3,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { analytics } from "@/lib/data";
import FlashcardEditor from "@/components/flashcard-editor";
import QuestionEditor from "@/components/question-editor";
import VideoUploader from "@/components/video-uploader";
import LessonAnalyticsChart from "@/components/lesson-analytics-chart";
import { useState, useEffect } from "react";
import { getSectionData, updateSection, deleteSection } from "@/lib/api";
import WordEditor from "@/components/word-editor";

export default function LessonPage({ params }) {
  const { courseId, lessonId, sectionId } = params;
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      // setLoading(true);
      const data = await getSectionData(sectionId);
      if (data) {
        setSection(data);
      } else {
        setError("Section not found");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch section");
      setLoading(false);
    }
  };

  const handleUpdateSection = async (updatedData) => {
    try {
      const updatedSection = await updateSection(updatedData);
      fetchLesson();
      setSection(updatedSection);
    } catch (err) {
      setError("Failed to update section");
    }
  };

  const handleDeleteSection = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteSection = async () => {
    try {
      await deleteSection(sectionId);
      // Redirect to lesson page or handle deletion success
    } catch (err) {
      setError("Failed to delete section");
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const handleUpdateVideo = async (videoUrl) => {
    try {
      await handleUpdateSection({ videoUrl });
    } catch (err) {
      setError("Failed to update video");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!section) return <div>Section not found</div>;

  // Get lesson analytics data
  const lessonAnalytics = analytics.lessonAnalytics[lessonId] || {
    views: 0,
    completionRate: 0,
    averageTimeSpent: 0,
    viewsOverTime: [],
    questionSuccessRates: [],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Link href={`/courses/${courseId}/lessons/${lessonId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold">{section.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {/* {course.title} • {part.title} */}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => handleUpdateSection(section)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="destructive" onClick={handleDeleteSection}>
                Delete Section
              </Button>
            </div>
          </div>

          <Tabs defaultValue="content">
            <TabsList className="mb-6">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="md:col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Lesson Details</CardTitle>
                      <CardDescription>
                        Basic information about this lesson
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={section.name}
                          onChange={(e) =>
                            setSection({ ...section, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={section.description || ""}
                          onChange={(e) =>
                            setSection({
                              ...section,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="video">
                    <TabsList className="mb-4">
                      <TabsTrigger
                        value="video"
                        className="flex items-center gap-2"
                      >
                        <Video className="h-4 w-4" />
                        Video
                      </TabsTrigger>
                      <TabsTrigger
                        value="flashcards"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Flashcards
                      </TabsTrigger>
                      <TabsTrigger
                        value="questions"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Questions
                      </TabsTrigger>
                      <TabsTrigger
                        value="words"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Words
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="video">
                      <VideoUploader
                        sectionId={section.id}
                        video={section.videoUrl}
                        onVideoUpdate={handleUpdateVideo}
                      />
                    </TabsContent>

                    <TabsContent value="flashcards">
                      <FlashcardEditor
                        flashcards={section.flashCards || []}
                        params={params}
                      />
                    </TabsContent>

                    <TabsContent value="questions">
                      <QuestionEditor
                        questions={section.questions || []}
                        params={params}
                      />
                    </TabsContent>

                    <TabsContent value="words">
                      <WordEditor words={section.words || []} params={params} />
                    </TabsContent>
                  </Tabs>
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
                            section.status === "Published"
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {section.status || "Draft"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Content Type
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {section.videoUrl && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                              Video
                            </span>
                          )}
                          {section.flashCards &&
                            section.flashCards.length > 0 && (
                              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
                                Flashcards
                              </span>
                            )}
                          {section.questions &&
                            section.questions.length > 0 && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                                Questions
                              </span>
                            )}
                          {section.words && section.words.length > 0 && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                              Words
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Duration
                        </div>
                        <div>{section.duration || 0} minutes</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Completion Rate
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress
                            value={lessonAnalytics.completionRate || 0}
                            className="h-2 flex-1"
                          />
                          <span className="text-sm font-medium">
                            {lessonAnalytics.completionRate || 0}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Views
                        </div>
                        <div>{lessonAnalytics.views || 0} total views</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Views
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {lessonAnalytics.views || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{lessonAnalytics.newViews || 0} new this week
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
                      {lessonAnalytics.completionRate || 0}%
                    </div>
                    <Progress
                      value={lessonAnalytics.completionRate || 0}
                      className="h-2 mt-2"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Time Spent
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {lessonAnalytics.averageTimeSpent || 0} min
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Per student session
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Views Over Time</CardTitle>
                    <CardDescription>Daily lesson views</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <LessonAnalyticsChart
                      data={lessonAnalytics.viewsOverTime || []}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Question Success Rates</CardTitle>
                    <CardDescription>
                      Percentage of correct answers per question
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <LessonAnalyticsChart
                      data={lessonAnalytics.questionSuccessRates || []}
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Student Feedback</CardTitle>
                  <CardDescription>
                    Comments and ratings from students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(lessonAnalytics.feedback || []).map((feedback, i) => (
                      <div
                        key={i}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, j) => (
                            <svg
                              key={j}
                              className={`h-4 w-4 ${
                                j < feedback.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium">
                            {feedback.student}
                          </span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {feedback.date}
                          </span>
                        </div>
                        <p className="text-sm">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this section? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteSection}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
