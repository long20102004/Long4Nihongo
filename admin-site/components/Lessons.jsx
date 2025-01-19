import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditLessonForm from "./EditLessonForm";
export default function Lessons({ lessons, onSelect, onEdit, onDelete }) {
  useEffect(() => {
    console.log(lessons);
  }, []);
  return (
    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mt-4">
      <ul className="divide-y divide-gray-700">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200"
          >
            <div
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(lesson)}
            >
              <div className="text-lg font-medium text-indigo-400">
                {lesson.name}
              </div>
              <div className="text-sm text-gray-400">
                {lesson.sections.length} sections
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                  </DialogHeader>
                  <EditLessonForm lesson={lesson} onEdit={onEdit} />
                </DialogContent>
              </Dialog>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(lesson.id);
                }}
                variant="destructive"
                size="icon"
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
