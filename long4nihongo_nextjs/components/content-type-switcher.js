"use client";

import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

export function ContentTypeSwitcher({
  unavailbleContent,
  activeType,
  onChange,
}) {
  return (
    <div className="flex space-x-2 mb-4">
      {!unavailbleContent.includes("video") && (
        <Button
          variant={activeType === "video" ? "default" : "outline"}
          onClick={() => onChange("video")}
          className="w-28"
        >
          Video
        </Button>
      )}
      {!unavailbleContent.includes("flashcard") && (
        <Button
          variant={activeType === "flashcard" ? "default" : "outline"}
          onClick={() => onChange("flashcard")}
          className="w-28"
        >
          Flash Cards
        </Button>
      )}
      {!unavailbleContent.includes("quiz") && (
        <Button
          variant={activeType === "quiz" ? "default" : "outline"}
          onClick={() => onChange("quiz")}
          className="w-28"
        >
          Quiz
        </Button>
      )}
      {!unavailbleContent.includes("word") && (
        <Button
          variant={activeType === "word" ? "default" : "outline"}
          onClick={() => onChange("word")}
          className="w-28"
        >
          Word
        </Button>
      )}
      {!unavailbleContent.includes("slide") && (
        <Button
          variant={activeType === "slide" ? "default" : "outline"}
          onClick={() => onChange("slide")}
          className="w-28"
        >
          Slide
        </Button>
      )}
    </div>
  );
}
