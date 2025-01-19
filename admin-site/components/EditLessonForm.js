import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditLessonForm({ lesson, onEdit }) {
  const [editedLesson, setEditedLesson] = useState(lesson);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedLesson);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Lesson Name</Label>
        <Input
          id="name"
          name="name"
          value={editedLesson.name}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <Label htmlFor="imgUrl">Image URL</Label>
        <Input
          id="imgUrl"
          name="imgUrl"
          value={editedLesson.imgUrl}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <Button type="submit" className="w-full">
        Save Lesson Changes
      </Button>
    </form>
  );
}
