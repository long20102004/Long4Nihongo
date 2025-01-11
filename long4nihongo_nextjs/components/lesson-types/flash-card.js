"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function FlashCard({ flashcards }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2); // Start with card 33
  const [direction, setDirection] = useState(0);

  const currentCard = flashcards[currentIndex];
  const learned = currentIndex - 2; // Number of cards learned (before current)
  const remaining = flashcards.length - (currentIndex + 1); // Number of cards remaining (after current)

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      // setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      // setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-center space-x-4 text-lg font-medium">
        <span className="text-red-500">{learned}</span>
        <span className="text-slate-400">←</span>
        <span className="text-white">{currentIndex}</span>
        <span className="text-slate-400">→</span>
        <span className="text-green-500">{remaining}</span>
      </div>

      {/* Card */}
      <div className="relative w-full perspective">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`${currentCard.id}-${isFlipped ? "back" : "front"}`}
            className="w-full bg-slate-800 rounded-xl shadow-lg border border-slate-700"
            initial={{
              rotateY: direction === 1 ? -90 : 90,
              x: direction === 1 ? 100 : -100,
              opacity: 0,
            }}
            animate={{
              rotateY: 0,
              x: 0,
              opacity: 1,
            }}
            exit={{
              rotateY: direction === 1 ? 90 : -90,
              x: direction === 1 ? -100 : 100,
              opacity: 0,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-6 space-y-4">
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={currentCard.image}
                  alt="Illustration"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  {isFlipped ? currentCard.word : currentCard.meaning}
                </h2>
                <p className="text-lg text-slate-400">
                  {isFlipped ? currentCard.word : currentCard.meaning}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-4 text-slate-400">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{currentCard.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>{currentCard.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full space-x-4">
        <Button
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        {/* <Button
          className="bg-slate-700 hover:bg-slate-600 text-white px-3"
          onClick={handleFlip}
        >
          <RotateCcw className="w-5 h-5" />
        </Button> */}
        <Button
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
