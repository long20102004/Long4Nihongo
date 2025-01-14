import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api-fetch";
import { PlayCircle } from "lucide-react";
import { useLessons } from "@/lib/context/lesson-provider";

export default function Section({ onSelect, isSelected, section }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useLessons();

  const handleClick = async () => {
    setIsLoading(true);
    onSelect();
    setData(section);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="ghost"
      className={`w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50 h-auto py-2 transition-colors duration-200 ${
        isSelected ? "bg-slate-600 text-white" : ""
      }`}
      aria-pressed={isSelected}
    >
      <PlayCircle className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
      <span className="text-left whitespace-normal break-words">
        {section.name}
      </span>
    </Button>
  );
}
