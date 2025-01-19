import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function EditForm({ data, onSave, onCancel }) {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={editedData.name}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      {editedData.type === "course" && (
        <>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editedData.description}
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
              value={editedData.price}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </>
      )}
      <div>
        <Label htmlFor="imgUrl">Image URL</Label>
        <Input
          id="imgUrl"
          name="imgUrl"
          value={editedData.imgUrl}
          onChange={handleChange}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Save Changes
        </Button>
        <Button type="button" onClick={onCancel} variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
