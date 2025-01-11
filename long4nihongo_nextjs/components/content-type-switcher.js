"use client";

import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

export function ContentTypeSwitcher({ activeType, onChange }) {
  return (
    <div className="flex space-x-2 mb-4">
      <Button
        variant={activeType === "video" ? "default" : "outline"}
        onClick={() => onChange("video")}
        className="w-28"
      >
        Video
      </Button>
      <Button
        variant={activeType === "flashcard" ? "default" : "outline"}
        onClick={() => onChange("flashcard")}
        className="w-28"
      >
        Flash Cards
      </Button>
      <Button
        variant={activeType === "quiz" ? "default" : "outline"}
        onClick={() => onChange("quiz")}
        className="w-28"
      >
        Quiz
      </Button>
    </div>
  );
}
