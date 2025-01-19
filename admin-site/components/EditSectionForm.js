import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditSectionForm({ section, onEdit }) {
  const [editedSection, setEditedSection] = useState(section);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedSection);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Section Name</Label>
        <Input
          id="name"
          name="name"
          value={editedSection.name}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div>
        <Label htmlFor="imgUrl">Image URL</Label>
        <Input
          id="imgUrl"
          name="imgUrl"
          value={editedSection.imgUrl}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <Button type="submit" className="w-full">
        Save Section Changes
      </Button>
    </form>
  );
}
