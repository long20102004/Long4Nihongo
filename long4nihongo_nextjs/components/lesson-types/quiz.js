"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JapaneseText } from "@/components/ui/japanese-text";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  Volume2,
} from "lucide-react";

export function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [maxQuestionReached, setMaxQuestionReached] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const previousQuestionRef = useRef(null);

  useEffect(() => {
    resetQuiz();
  }, []); // Removed unnecessary dependency 'questions'

  // useEffect(() => {
  //   // Auto-read question when navigating to a new question
  //   if (previousQuestionRef.current !== currentQuestion) {
  //     speakQuestion();
  //     previousQuestionRef.current = currentQuestion;
  //   }
  // }, [currentQuestion]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setScore(0);
    setMaxQuestionReached(0);
    setQuizCompleted(false);
    previousQuestionRef.current = null;
  };

  const speakQuestion = () => {
    if (window.speechSynthesis && questions[currentQuestion]) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Get the question text and only remove asterisk (*) characters
      const questionText = questions[currentQuestion].question;
      // Remove only asterisk (*) characters
      const cleanedText = questionText.replace(/\*/g, "");

      // Create utterance with the cleaned question text
      const utterance = new SpeechSynthesisUtterance(cleanedText);

      // Try to set Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoice = voices.find(
        (voice) => voice.lang.includes("ja") || voice.lang.includes("JP")
      );

      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }

      // Set language to Japanese
      utterance.lang = "ja-JP";

      // Speak the question
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (index) => {
    if (selectedAnswers[currentQuestion] !== null) return;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = index;
    setSelectedAnswers(newSelectedAnswers);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setTimeout(() => {
        handleJumpForward();
      }, 1000);
    }
  };

  const handleJumpBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpForward = () => {
    if (
      currentQuestion < maxQuestionReached &&
      currentQuestion < questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (
      currentQuestion === maxQuestionReached &&
      currentQuestion < questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
      setMaxQuestionReached(maxQuestionReached + 1);
    }
  };

  const calculatePercentage = () => (score / questions.length) * 100;

  const isPassed = calculatePercentage() >= 70;

  if (quizCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Quiz Completed!
        </h2>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-4">
          Your score: {score} / {questions.length} (
          {calculatePercentage().toFixed(2)}%)
        </p>
        <p className="text-xl font-semibold mb-8">
          {isPassed
            ? "Congratulations! You passed!"
            : "Keep practicing. You can do better!"}
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={resetQuiz} className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            onClick={() => onComplete(isPassed)}
            className="flex items-center"
          >
            Next Section
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            <JapaneseText text={questions[currentQuestion].question} />
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={speakQuestion}
            aria-label="Read question aloud"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswers[currentQuestion] !== null}
              className={cn(
                "h-24 text-lg",
                selectedAnswers[currentQuestion] === index &&
                  index === questions[currentQuestion].correctAnswer &&
                  "bg-green-500 dark:bg-green-600",
                selectedAnswers[currentQuestion] === index &&
                  index !== questions[currentQuestion].correctAnswer &&
                  "bg-red-500 dark:bg-red-600",
                selectedAnswers[currentQuestion] !== null &&
                  index === questions[currentQuestion].correctAnswer &&
                  "bg-green-500 dark:bg-green-600"
              )}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handleJumpBack}
            disabled={currentQuestion === 0}
            variant="ghost"
            size="m"
            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleJumpForward}
            disabled={
              currentQuestion === maxQuestionReached ||
              currentQuestion === questions.length - 1
            }
            variant="ghost"
            size="m"
            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center text-xl font-semibold text-slate-900 dark:text-white">
        Score: {score} / {questions.length}
      </div>
    </div>
  );
}
