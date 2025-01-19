import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import Courses from "./Courses";

export function CourseList({
  courses,
  newCourse,
  onAddCourse,
  onSaveNewCourse,
  onSetNewCourse,
  onSelectCourse,
  onEditCourse,
  onDeleteCourse,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Courses</h2>
        <Button
          onClick={onAddCourse}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>
      {newCourse && (
        <Card className="mb-6 bg-gray-800">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={newCourse.name}
              onChange={(e) =>
                onSetNewCourse({
                  ...newCourse,
                  name: e.target.value,
                })
              }
              placeholder="Course name"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              value={newCourse.price}
              onChange={(e) =>
                onSetNewCourse({
                  ...newCourse,
                  price: e.target.value,
                })
              }
              placeholder="Course price"
              type="number"
              min="0"
              step="0.01"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              value={newCourse.course_img_url}
              onChange={(e) =>
                onSetNewCourse({
                  ...newCourse,
                  course_img_url: e.target.value,
                })
              }
              placeholder="Course image URL"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Textarea
              value={newCourse.description}
              onChange={(e) =>
                onSetNewCourse({
                  ...newCourse,
                  description: e.target.value,
                })
              }
              placeholder="Course description"
              className="bg-gray-700 text-white border-gray-600 min-h-[100px]"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => onSaveNewCourse("course", newCourse)}
                className="bg-green-600 hover:bg-green-700"
              >
                Save
              </Button>
              <Button onClick={() => onSetNewCourse(null)} variant="ghost">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Courses
        courses={courses}
        onSelect={onSelectCourse}
        onEdit={onEditCourse}
        onDelete={onDeleteCourse}
      />
    </>
  );
}
