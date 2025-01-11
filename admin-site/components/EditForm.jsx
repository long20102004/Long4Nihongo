import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-8 divide-y divide-gray-700"
    >
      <div className="space-y-8 divide-y divide-gray-700 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-100">
              Edit {data.type}
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-700 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={editedData.title}
                  onChange={handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-100"
                />
              </div>
            </div>

            {data.type === "section" && (
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-700 sm:pt-5">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-300 sm:mt-px sm:pt-2"
                >
                  Content
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <Textarea
                    id="content"
                    name="content"
                    rows={3}
                    value={editedData.content}
                    onChange={handleChange}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-700 rounded-md bg-gray-700 text-gray-100"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="mr-3"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="ml-3 bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
