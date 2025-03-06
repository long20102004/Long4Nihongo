"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Filter, ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCoursesAndData, deleteCourse, addCourse } from "@/lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [newCourseData, setNewCourseData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    status: "Draft",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCoursesAndData();
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch courses");
      setLoading(false);
    }
  };

  const handleNewCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      addCourse(newCourseData);
      console.log("Course data to submit:", newCourseData);

      // Reset form and hide it
      setNewCourseData({
        name: "",
        description: "",
        imageUrl: "",
        status: "Draft",
      });
      setShowNewCourseForm(false);

      // Refresh the course list
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteCourse = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCourse = async () => {
    try {
      await deleteCourse(courseToDelete);
      fetchCourses(); // Refresh the course list
      setShowDeleteConfirmation(false);
      setCourseToDelete(null);
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button onClick={() => setShowNewCourseForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing <strong>{courses.length}</strong> courses
          </div>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                className="block"
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={
                        course.imageUrl ||
                        "/placeholder.svg?height=200&width=400" ||
                        "/placeholder.svg"
                      }
                      alt={course.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      0 lessons
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        +{course.enrollments || 0} students
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-3">
                    <div className="flex w-full justify-between text-sm">
                      <span>
                        Last updated:{" "}
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`font-medium ${
                          course.status === "Published"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="border-b">
                <div className="flex items-center p-4 text-sm font-medium">
                  <div className="w-[40%] flex items-center gap-2">
                    Title <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div className="w-[15%] flex items-center gap-2">
                    Status <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div className="w-[15%] flex items-center gap-2">
                    Students <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div className="w-[15%] flex items-center gap-2">
                    Last Updated <ArrowUpDown className="h-3 w-3" />
                  </div>
                  <div className="w-[15%] text-right">Actions</div>
                </div>
              </div>
              <div className="divide-y">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center p-4">
                    <div className="w-[40%] flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img
                          src={
                            course.thumbnail ||
                            "/placeholder.svg?height=40&width=40" ||
                            "/placeholder.svg"
                          }
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground">
                          0lessons
                        </div>
                      </div>
                    </div>
                    <div className="w-[15%]">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          course.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                    <div className="w-[15%]">{course.enrollments || 0}</div>
                    <div className="w-[15%] text-sm">
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="w-[15%] text-right">
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showNewCourseForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Create New Course</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewCourseForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleNewCourseSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter course name"
                    value={newCourseData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter course description"
                    value={newCourseData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    value={newCourseData.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newCourseData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewCourseForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Course</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this course? This action cannot be
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
                onClick={confirmDeleteCourse}
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
