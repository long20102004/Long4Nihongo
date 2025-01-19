"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
          <div
            className="h-2 bg-teal-500 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          {questions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={cn(
                "h-24 text-lg",
                selectedAnswer === index &&
                  index === questions[currentQuestion].correctAnswer &&
                  "bg-green-500 dark:bg-green-600",
                selectedAnswer === index &&
                  index !== questions[currentQuestion].correctAnswer &&
                  "bg-red-500 dark:bg-red-600",
                selectedAnswer !== null &&
                  index === questions[currentQuestion].correctAnswer &&
                  "bg-green-500 dark:bg-green-600"
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center text-xl font-semibold text-slate-900 dark:text-white">
        Score: {score} / {questions.length}
      </div>
    </div>
  );
}
