"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Edit, Save, Trash2, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
export default function FlashcardsGrid({
  flashcards,
  onEdit,
  onDelete,
  onAdd,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedFlashcard, setEditedFlashcard] = useState({});
  const [newFlashcard, setNewFlashcard] = useState({
    word: "",
    meaning: "",
    example: "",
    imgUrl: "",
  });
  const [multipleFlashcards, setMultipleFlashcards] = useState("");

  const handleEdit = (flashcard) => {
    setEditingId(flashcard.id);
    setEditedFlashcard(flashcard);
  };

  const handleSave = () => {
    onEdit(editedFlashcard);
    setEditingId(null);
  };
  const handleAddMultipleFlashcards = async () => {
    // Make the function async
    const flashcards = multipleFlashcards.split("\n").map((line) => {
      const [word, meaning, example, imgUrl] = line
        .split(",")
        .map((item) => item.trim());
      return { word, meaning, example, imgUrl };
    });

    for (const flashcard of flashcards) {
      onAdd(flashcard);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay
    }

    setMultipleFlashcards("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((flashcard, index) => (
        <Card
          key={index}
          className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Book className="mr-2 h-4 w-4 text-indigo-400" />
              Flashcard {index + 1}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleEdit(flashcard)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-gray-600"
              >
                <Edit className="h-4 w-4 text-indigo-400" />
              </Button>
              <Button
                onClick={() => onDelete(flashcard.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-gray-600"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {editingId === flashcard.id ? (
              <>
                <Input
                  value={editedFlashcard.word}
                  onChange={(e) =>
                    setEditedFlashcard({
                      ...editedFlashcard,
                      word: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Word"
                />
                <Input
                  value={editedFlashcard.meaning}
                  onChange={(e) =>
                    setEditedFlashcard({
                      ...editedFlashcard,
                      meaning: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Meaning"
                />
                <Input
                  value={editedFlashcard.example}
                  onChange={(e) =>
                    setEditedFlashcard({
                      ...editedFlashcard,
                      example: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Example"
                />
                <Input
                  value={editedFlashcard.imgUrl}
                  onChange={(e) =>
                    setEditedFlashcard({
                      ...editedFlashcard,
                      imgUrl: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Image Url"
                />
                <Button
                  onClick={handleSave}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <p className="mb-2">
                  <span className="font-semibold">Word:</span> {flashcard.word}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Meaning:</span>{" "}
                  {flashcard.meaning}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Example:</span>{" "}
                  {flashcard.example}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">imgUrl:</span>{" "}
                  {flashcard.imgUrl}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-indigo-400" />
            Add New Flashcard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newFlashcard.word}
            onChange={(e) =>
              setNewFlashcard({ ...newFlashcard, word: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Word"
          />
          <Input
            value={newFlashcard.meaning}
            onChange={(e) =>
              setNewFlashcard({ ...newFlashcard, meaning: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Meaning"
          />
          <Input
            value={newFlashcard.example}
            onChange={(e) =>
              setNewFlashcard({ ...newFlashcard, example: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Example"
          />
          <Input
            value={newFlashcard.imgUrl}
            onChange={(e) =>
              setNewFlashcard({ ...newFlashcard, imgUrl: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Image Url"
          />
          <Button
            onClick={() => {
              onAdd(newFlashcard);
              setNewFlashcard({
                word: "",
                meaning: "",
                example: "",
                imgUrl: "",
              });
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Flashcard
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200 mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-blue-400" />
            Add Multiple Flashcards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={multipleFlashcards}
            onChange={(e) => setMultipleFlashcards(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Enter multiple flashcards (one per line, format: word,meaning,example,imageurl)"
            rows={10}
          />
          <Button
            onClick={handleAddMultipleFlashcards}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Multiple Flashcards
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
