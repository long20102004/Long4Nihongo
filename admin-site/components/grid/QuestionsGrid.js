"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Edit, Save, Trash2, Plus } from "lucide-react";

export default function QuestionsGrid({
  sectionId,
  questions,
  onEdit,
  onDelete,
  onAdd,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: "",
  });
  const [multipleQuestions, setMultipleQuestions] = useState("");

  const handleEdit = (question) => {
    setEditingId(question.id);
    setEditedQuestion(question);
  };

  const handleSave = () => {
    onEdit(editedQuestion);
    setEditingId(null);
  };

  const handleAddMultipleQuestions = () => {
    console.log(multipleQuestions);
    const questions = multipleQuestions.split("\n\n").map((q) => {
      const [question, ...answers] = q.split("\n");
      console.log(answers);
      const correctAnswer = answers.pop().replace("Correct Answer: ", "");

      return {
        question,
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
        answer4: answers[3],
        correctAnswer,
        answers: answers,
      };
    });
    questions.forEach((q) => onAdd(q));
    setMultipleQuestions("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question, index) => (
        <Card
          key={question.id}
          className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <HelpCircle className="mr-2 h-4 w-4 text-green-400" />
              Question {index + 1}
            </CardTitle>
            {editingId !== question.id && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleEdit(question)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 hover:bg-gray-600"
                >
                  <Edit className="h-4 w-4 text-green-400" />
                </Button>
                <Button
                  onClick={() => onDelete(question.id)}
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
            {editingId === question.id ? (
              <>
                <Input
                  value={editedQuestion.question}
                  onChange={(e) =>
                    setEditedQuestion({
                      ...editedQuestion,
                      question: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Question"
                />
                {[1, 2, 3, 4].map((num) => (
                  <Input
                    key={num}
                    value={editedQuestion.answers[num - 1]}
                    onChange={(e) => {
                      const newAnswers = [...editedQuestion.answers];
                      newAnswers[num - 1] = e.target.value;
                      setEditedQuestion({
                        ...editedQuestion,
                        answers: newAnswers,
                      });
                    }}
                    className="mb-2 bg-gray-700 text-white border-gray-600"
                    placeholder={`Answer ${num}`}
                  />
                ))}
                <Input
                  value={editedQuestion.correctAnswer}
                  onChange={(e) =>
                    setEditedQuestion({
                      ...editedQuestion,
                      correctAnswer: e.target.value,
                    })
                  }
                  className="mb-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Correct Answer"
                />
                <Button
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <p className="mb-2">
                  <span className="font-semibold">Question:</span>{" "}
                  {question.question}
                </p>
                {[1, 2, 3, 4].map((num) => (
                  <p key={num} className="mb-1">
                    <span className="font-semibold">Answer {num}:</span>{" "}
                    {question.answers[num - 1]}
                  </p>
                ))}
                <p className="mb-2">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {question.correctAnswer}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-green-400" />
            Add New Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Question"
          />
          {[1, 2, 3, 4].map((num) => (
            <Input
              key={num}
              value={newQuestion[`answer${num}`]}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  [`answer${num}`]: e.target.value,
                })
              }
              className="mb-2 bg-gray-700 text-white border-gray-600"
              placeholder={`Answer ${num}`}
            />
          ))}
          <Input
            value={newQuestion.correctAnswer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
            }
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Correct Answer"
          />
          <Button
            onClick={() => {
              onAdd({
                ...newQuestion,
                answers: [
                  newQuestion.answer1,
                  newQuestion.answer2,
                  newQuestion.answer3,
                  newQuestion.answer4,
                ],
              });
              setNewQuestion({
                question: "",
                answer1: "",
                answer2: "",
                answer3: "",
                answer4: "",
                correctAnswer: "",
              });
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4 text-blue-400" />
            Add Multiple Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={multipleQuestions}
            onChange={(e) => setMultipleQuestions(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-gray-600"
            placeholder="Enter multiple questions (one per paragraph)"
            rows={10}
          />
          <Button
            onClick={handleAddMultipleQuestions}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Multiple Questions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
