import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import Lessons from "./Lessons";

export function LessonList({
  selectedCourse,
  newLesson,
  onAddLesson,
  onSaveNewLesson,
  onSetNewLesson,
  onSelectLesson,
  onEditLesson,
  onDeleteLesson,
}) {
  if (!selectedCourse) return null;

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-6">
        <h3 className="text-2xl font-bold">
          Lessons for {selectedCourse.name}
        </h3>
        <Button
          onClick={onAddLesson}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson
        </Button>
      </div>
      {newLesson && (
        <Card className="mb-6 bg-gray-800">
          <CardHeader>
            <CardTitle>Add New Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={newLesson.name}
              onChange={(e) =>
                onSetNewLesson({
                  ...newLesson,
                  name: e.target.value,
                })
              }
              placeholder="Lesson name"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              value={newLesson.imgUrl}
              onChange={(e) =>
                onSetNewLesson({
                  ...newLesson,
                  imgUrl: e.target.value,
                })
              }
              placeholder="Lesson image URL"
              className="bg-gray-700 text-white border-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() =>
                  onSaveNewLesson("lesson", {
                    ...newLesson,
                    courseId: selectedCourse.id,
                  })
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Save
              </Button>
              <Button onClick={() => onSetNewLesson(null)} variant="ghost">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Lessons
        lessons={selectedCourse.lessons}
        onSelect={onSelectLesson}
        onEdit={onEditLesson}
        onDelete={onDeleteLesson}
      />
    </>
  );
}
