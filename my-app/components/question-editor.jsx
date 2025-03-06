"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Grip, Plus, Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateMultipleQuestion } from "@/lib/api";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";

export default function QuestionEditor({
  params,
  questions: initialQuestions = [],
}) {
  const { courseId, lessonId, sectionId } = params;
  const [questions, setQuestions] = useState(
    initialQuestions.length > 0 ? initialQuestions : []
  );

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // 'question' or 'option'
  const [parentQuestionId, setParentQuestionId] = useState(null); // For option deletion

  const addQuestion = () => {
    const newQuestion = {
      tempId: Date.now().toString(), // Ensure tempId is a string
      sectionId: sectionId,
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: null,
      explanation: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const openDeleteQuestionDialog = (id) => {
    setItemToDelete(id);
    setDeleteType("question");
    setDeleteDialogOpen(true);
  };

  const openDeleteOptionDialog = (questionId, optionIndex) => {
    setItemToDelete(optionIndex);
    setParentQuestionId(questionId);
    setDeleteType("option");
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
    setParentQuestionId(null);
    setDeleteType("");
  };

  const confirmDelete = () => {
    if (deleteType === "question" && itemToDelete) {
      setQuestions(
        questions.filter((q) => {
          // Handle both tempId and id cases
          const qId = q.id || q.tempId;
          return qId !== itemToDelete;
        })
      );
    } else if (
      deleteType === "option" &&
      itemToDelete !== null &&
      parentQuestionId
    ) {
      setQuestions(
        questions.map((q) => {
          const qId = q.id || q.tempId;
          if (qId === parentQuestionId) {
            const newAnswers = [...q.answers];
            newAnswers.splice(itemToDelete, 1);
            return {
              ...q,
              answers: newAnswers,
              correctAnswer:
                q.correctAnswer > itemToDelete
                  ? q.correctAnswer - 1
                  : q.correctAnswer === itemToDelete + 1
                  ? null
                  : q.correctAnswer,
            };
          }
          return q;
        })
      );
    }
    closeDeleteDialog();
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => {
        const qId = q.id || q.tempId;
        return qId === id ? { ...q, [field]: value } : q;
      })
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) => {
        const qId = q.id || q.tempId;
        if (qId === questionId) {
          return { ...q, answers: [...q.answers, ""] };
        }
        return q;
      })
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        const qId = q.id || q.tempId;
        if (qId === questionId) {
          const newAnswers = [...q.answers];
          newAnswers[optionIndex] = value;
          return { ...q, answers: newAnswers };
        }
        return q;
      })
    );
  };

  const saveQuestions = async () => {
    try {
      // Create a deep copy to avoid mutation issues
      const questionsToSend = questions.map(({ tempId, ...question }) => ({
        ...question,
        sectionId: sectionId,
      }));
      await updateMultipleQuestion(questionsToSend);
      console.log("Questions saved successfully:", questionsToSend);
      // You can add a success message or further actions here
    } catch (error) {
      console.error("Error saving questions:", error);
      // You can add error handling here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Questions</h2>
        <Button size="sm" onClick={addQuestion}>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
      {questions.map((question, index) => (
        <Card key={question.id || question.tempId} className="relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center px-2 cursor-move">
            <Grip className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardHeader className="pb-2 pl-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Question {index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  openDeleteQuestionDialog(question.id || question.tempId)
                }
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete question</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pl-10">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor={`question-${question.id || question.tempId}`}>
                  Question
                </Label>
                <span className="text-xs text-muted-foreground">
                  Use **word** to make text bold
                </span>
              </div>
              <Textarea
                id={`question-${question.id || question.tempId}`}
                value={question.question || ""}
                onChange={(e) =>
                  updateQuestion(
                    question.id || question.tempId,
                    "question",
                    e.target.value
                  )
                }
                placeholder="Enter your question (use **word** for bold text)"
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <RadioGroup
                value={question.correctAnswer?.toString() || ""}
                onValueChange={(value) => {
                  updateQuestion(
                    question.id || question.tempId,
                    "correctAnswer",
                    value ? Number.parseInt(value) : null
                  );
                }}
              >
                {question.answers.map((answer, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2 border rounded-md p-3"
                  >
                    <RadioGroupItem
                      value={(optionIndex + 1).toString()}
                      id={`option-${
                        question.id || question.tempId
                      }-${optionIndex}`}
                    />
                    <div className="flex-1 grid gap-1.5">
                      <Input
                        value={answer || ""}
                        onChange={(e) =>
                          updateOption(
                            question.id || question.tempId,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </div>
                    {question.answers.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          openDeleteOptionDialog(
                            question.id || question.tempId,
                            optionIndex
                          )
                        }
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete option</span>
                      </Button>
                    )}
                  </div>
                ))}
              </RadioGroup>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addOption(question.id || question.tempId)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`explanation-${question.id || question.tempId}`}>
                Explanation (Optional)
              </Label>
              <Textarea
                id={`explanation-${question.id || question.tempId}`}
                value={question.explanation || ""}
                onChange={(e) =>
                  updateQuestion(
                    question.id || question.tempId,
                    "explanation",
                    e.target.value
                  )
                }
                placeholder="Provide an explanation for the correct answer"
              />
            </div>
          </CardContent>
        </Card>
      ))}
      {questions.length > 0 && (
        <CardFooter className="border-t bg-muted/50 flex justify-end gap-2 pl-10">
          <Button variant="outline" size="sm">
            Preview
          </Button>
          <Button size="sm" onClick={saveQuestions}>
            Save
          </Button>
        </CardFooter>
      )}

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title={`Delete ${deleteType === "question" ? "Question" : "Option"}`}
        description={`Are you sure you want to delete this ${
          deleteType === "question" ? "question" : "option"
        }? This action cannot be undone.`}
      />
    </div>
  );
}
