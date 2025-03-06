"use client";

import { useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addMultipleWords } from "@/lib/api";

export default function WordEditor({ words = [], params }) {
  const { courseId, lessonId, sectionId } = params;
  const [wordList, setWordList] = useState(words);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [newWord, setNewWord] = useState({
    hiragana: "",
    kanji: "",
    meaning: "",
    notes: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [wordToDeleteIndex, setWordToDeleteIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddWord = () => {
    try {
      if (!newWord.hiragana || !newWord.meaning) {
        setError("Hiragana/Katakana and Meaning are required");
        return;
      }

      const wordToAdd = {
        ...newWord,
        id:
          editingIndex >= 0 ? wordList[editingIndex].id : Date.now().toString(),
      };

      if (editingIndex >= 0) {
        const updatedWords = [...wordList];
        updatedWords[editingIndex] = wordToAdd;
        setWordList(updatedWords);
      } else {
        setWordList([...wordList, wordToAdd]);
      }

      // Reset form
      setNewWord({
        hiragana: "",
        kanji: "",
        meaning: "",
        notes: "",
      });
      setEditingIndex(-1);
      setError(null);
      setUnsavedChanges(true);
    } catch (err) {
      setError("Failed to add word");
    }
  };

  const handleEditWord = (index) => {
    setNewWord(wordList[index]);
    setEditingIndex(index);
  };

  const handleDeleteWordConfirmation = (index) => {
    setWordToDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteWord = () => {
    if (wordToDeleteIndex !== null) {
      const updatedWords = [...wordList];
      updatedWords.splice(wordToDeleteIndex, 1);
      setWordList(updatedWords);
      setUnsavedChanges(true);
    }
    setShowDeleteConfirmation(false);
    setWordToDeleteIndex(null);
  };

  const cancelDeleteWord = () => {
    setShowDeleteConfirmation(false);
    setWordToDeleteIndex(null);
  };

  const handleSaveAllWords = async () => {
    try {
      setIsSaving(true);
      // Send all words to the server

      const listWordtoAdd = wordList.map((word) => ({ ...word, sectionId }));
      await addMultipleWords(listWordtoAdd);
      setUnsavedChanges(false);
      setIsSaving(false);
    } catch (err) {
      setError("Failed to save words");
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setNewWord({
      hiragana: "",
      kanji: "",
      meaning: "",
      notes: "",
    });
    setEditingIndex(-1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vocabulary Words</CardTitle>
          <CardDescription>
            Add vocabulary words with hiragana/katakana, kanji, and meaning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="hiraganaKatakana">Hiragana / Katakana</Label>
                <Input
                  id="hiraganaKatakana"
                  value={newWord.hiragana}
                  onChange={(e) =>
                    setNewWord({ ...newWord, hiragana: e.target.value })
                  }
                  placeholder="e.g., ねこ"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="kanji">Kanji</Label>
                <Input
                  id="kanji"
                  value={newWord.kanji}
                  onChange={(e) =>
                    setNewWord({ ...newWord, kanji: e.target.value })
                  }
                  placeholder="e.g., 猫"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meaning">Meaning</Label>
                <Input
                  id="meaning"
                  value={newWord.meaning}
                  onChange={(e) =>
                    setNewWord({ ...newWord, meaning: e.target.value })
                  }
                  placeholder="e.g., cat"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={newWord.notes}
                onChange={(e) =>
                  setNewWord({ ...newWord, notes: e.target.value })
                }
                placeholder="Additional notes, example sentences, etc."
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-2">
              {editingIndex >= 0 && (
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
              <Button onClick={handleAddWord}>
                {editingIndex >= 0 ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Word
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Word
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {wordList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Word List</CardTitle>
            <CardDescription>
              {wordList.length} word{wordList.length !== 1 ? "s" : ""} in this
              section
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hiragana / Katakana</TableHead>
                  <TableHead>Kanji</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wordList.map((word, index) => (
                  <TableRow key={word.id || index}>
                    <TableCell>{word.hiragana}</TableCell>
                    <TableCell>{word.kanji}</TableCell>
                    <TableCell>{word.meaning}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWord(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWordConfirmation(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSaveAllWords}
              disabled={!unsavedChanges || isSaving}
              className="mt-4"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save All Words"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this word? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={cancelDeleteWord}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteWord}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
