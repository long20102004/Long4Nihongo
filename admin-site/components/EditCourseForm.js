import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function EditCourseForm({ course, onEdit }) {
  const [editedCourse, setEditedCourse] = useState(course);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedCourse, "course");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Course Name</Label>
        <Input
          id="name"
          name="name"
          value={editedCourse.name}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={editedCourse.description}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={editedCourse.imageUrl}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={editedCourse.price}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
