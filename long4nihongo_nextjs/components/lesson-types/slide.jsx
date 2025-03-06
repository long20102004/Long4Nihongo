"use client";

import { useState, useRef } from "react";
import {
  Maximize,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function Slide({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? prevIndex : prevIndex + 1
    );
    // Reset zoom when changing slides
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
    // Reset zoom when changing slides
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 1));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.preventDefault(); // Prevent default behavior
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-lg p-8">
        <p className="text-slate-600 dark:text-slate-400">
          No slides available.
        </p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-full">
      {/* Regular slide view */}
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-lg p-4">
        <div className="relative max-w-full max-h-full">
          <img
            src={currentSlide.imgUrl || "/placeholder.svg"}
            alt={currentSlide.caption || `Slide ${currentIndex + 1}`}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
          {/* <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
            onClick={toggleFullScreen}
          >
            <Maximize className="h-4 w-4" />
          </Button> */}

          {/* Navigation buttons */}
          {slides.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                onClick={goToPrevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                onClick={goToNextSlide}
                disabled={currentIndex === slides.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {currentSlide.caption && (
          <div className="mt-4 text-center text-sm text-slate-700 dark:text-slate-300">
            {currentSlide.caption}
          </div>
        )}

        {/* Slide navigation dots */}
        {slides.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
