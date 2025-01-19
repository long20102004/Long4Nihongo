"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Edit, Save, Trash2, Plus } from "lucide-react";

export default function WordsGrid({ words, onEdit, onDelete, onAdd }) {
  const [editingId, setEditingId] = useState(null);
  const [editedWord, setEditedWord] = useState({});
  const [newWord, setNewWord] = useState({
    hiragana: "",
    kanji: "",
    meaning: "",
  });
  const [multipleWords, setMultipleWords] = useState("");

  const handleEdit = (word) => {
    setEditingId(word.id);
    setEditedWord(word);
  };

  const handleSave = () => {
    onEdit(editedWord);
    setEditingId(null);
  };

  const handleAddMultipleWords = () => {
    const words = multipleWords.split("\n").map((line) => {
      const [hiragana, kanji, meaning] = line
        .split(",")
        .map((item) => item.trim());
      return { hiragana, kanji, meaning };
    });
    words.forEach((word) => onAdd(word));
    setMultipleWords("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word, index) => (
        <Card
          key={word.id}
          className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-yellow-400" />
              Word {index}
            </CardTitle>
            {editingId !== word.id && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleEdit(word)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 hover:bg-gray-600"
                >
                  <Edit className="h-4 w-4 text-yellow-400" />
                </Button>
                <Button
                  onClick={() => onDelete(word.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 hover:bg-gray-600"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {editingId === word.id ? (
              <>
                <Input
                  value={editedWord.hiragana}
                  onChange={(e) =>
                    setEditedWord({ ...editedWord, hiragana: e.target.value })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Hiragana"
                />
                <Input
                  value={editedWord.kanji}
                  onChange={(e) =>
                    setEditedWord({ ...editedWord, kanji: e.target.value })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Kanji"
                />
                <Input
                  value={editedWord.meaning}
                  onChange={(e) =>
                    setEditedWord({ ...editedWord, meaning: e.target.value })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Meaning"
                />

                <Button
                  onClick={handleSave}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <p className="mb-2">
                  <span className="font-semibold">Hiragana:</span>{" "}
                  {word.hiragana}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Kanji:</span> {word.kanji}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Meaning:</span> {word.meaning}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-yellow-400" />
            Add New Word
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newWord.hiragana}
            onChange={(e) =>
              setNewWord({ ...newWord, hiragana: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Hiragana"
          />
          <Input
            value={newWord.kanji}
            onChange={(e) => setNewWord({ ...newWord, kanji: e.target.value })}
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Kanji"
          />
          <Input
            value={newWord.meaning}
            onChange={(e) =>
              setNewWord({ ...newWord, meaning: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Meaning"
          />

          <Button
            onClick={() => {
              onAdd(newWord);
              setNewWord({
                hiragana: "",
                kanji: "",
                meaning: "",
              });
            }}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Word
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-blue-400" />
            Add Multiple Words
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={multipleWords}
            onChange={(e) => setMultipleWords(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Enter multiple words (one per line, format: hiragana,kanji,meaning)"
            rows={10}
          />
          <Button
            onClick={handleAddMultipleWords}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Multiple Words
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
