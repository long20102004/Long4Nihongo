"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Edit2, UserPlus, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function UserCourseManagement({ receiveUsers }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    console.log(receiveUsers);
    setUsers(receiveUsers);
  }, [receiveUsers]);

  const addCourseToUser = () => {
    if (selectedUser && selectedCourse) {
      const courseToAdd = availableCourses.find(
        (course) => course.id === parseInt(selectedCourse)
      );
      if (courseToAdd) {
        const newCourse = { ...courseToAdd, timeLeft: courseToAdd.defaultTime };
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id
              ? { ...user, courses: [...user.courses, newCourse] }
              : user
          )
        );
        setSelectedUser({
          ...selectedUser,
          courses: [...selectedUser.courses, newCourse],
        });
        setSelectedCourse("");
      }
    }
  };

  const removeCourseFromUser = (courseId) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                courses: user.courses.filter(
                  (course) => course.id !== courseId
                ),
              }
            : user
        )
      );
      setSelectedUser({
        ...selectedUser,
        courses: selectedUser.courses.filter(
          (course) => course.id !== courseId
        ),
      });
    }
  };

  const updateCourseTime = (courseId, newTime) => {
    if (selectedUser) {
      const updatedCourses = selectedUser.courses.map((course) =>
        course.id === courseId
          ? { ...course, timeLeft: parseInt(newTime) }
          : course
      );
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, courses: updatedCourses }
            : user
        )
      );
      setSelectedUser({
        ...selectedUser,
        courses: updatedCourses,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <UserPlus className="mr-2 h-6 w-6 text-primary" />
            User Course Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Select
            value={selectedUser?.id.toString() || ""}
            onValueChange={(value) =>
              setSelectedUser(
                users.find((user) => user.id === parseInt(value)) || null
              )
            }
          >
            <SelectTrigger className="w-full mb-6">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900">
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedUser && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {selectedUser.name}'s Courses
              </h3>
              <Card className="bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <ScrollArea className="h-[300px] w-full rounded-md">
                  <ul className="p-4 space-y-2">
                    {selectedUser.courses.map((course) => (
                      <li
                        key={course.id}
                        className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                              {course.name}
                            </span>
                            <Badge variant="secondary" className="ml-2">
                              {course.timeLeft} days left
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit2 className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Course Time</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="time" className="text-right">
                                    Time Left (days)
                                  </Label>
                                  <Input
                                    id="time"
                                    defaultValue={course.timeLeft}
                                    className="col-span-3"
                                    onChange={(e) =>
                                      updateCourseTime(
                                        course.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            onClick={() => removeCourseFromUser(course.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </Card>

              <div className="flex space-x-2">
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                  className="flex-grow"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addCourseToUser} className="whitespace-nowrap">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Course
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
