import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import Sections from "./Sections";

export function SectionList({
  selectedLesson,
  newSection,
  onAddSection,
  onSaveNewSection,
  onSetNewSection,
  onSelectSection,
  onEditSection,
  onDeleteSection,
}) {
  if (!selectedLesson) return null;

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-6">
        <h4 className="text-xl font-bold">
          Sections for {selectedLesson.title}
        </h4>
        <Button
          onClick={onAddSection}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>
      {newSection && (
        <Card className="mb-6 bg-gray-800">
          <CardHeader>
            <CardTitle>Add New Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={newSection.name}
              onChange={(e) =>
                onSetNewSection({
                  ...newSection,
                  name: e.target.value,
                })
              }
              placeholder="Section name"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              value={newSection.imgUrl}
              onChange={(e) =>
                onSetNewSection({
                  ...newSection,
                  imgUrl: e.target.value,
                })
              }
              placeholder="Section image URL"
              className="bg-gray-700 text-white border-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() =>
                  onSaveNewSection("section", {
                    ...newSection,
                    lessonId: selectedLesson.id,
                  })
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Save
              </Button>
              <Button onClick={() => onSetNewSection(null)} variant="ghost">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Sections
        sections={selectedLesson.sections}
        onSelect={onSelectSection}
        onEdit={onEditSection}
        onDelete={onDeleteSection}
      />
    </>
  );
}
