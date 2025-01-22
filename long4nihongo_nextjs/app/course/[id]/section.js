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
    console.log(section);
  };

  return (
    <Button
      onClick={handleClick}
      // disabled={isLoading}
      variant="ghost"
      className={`w-full justify-start text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-white hover:bg-teal-200 dark:hover:bg-teal-700/50 h-auto py-2 transition-colors duration-200 ${
        isSelected
          ? "bg-teal-300 dark:bg-teal-600 text-teal-900 dark:text-white"
          : ""
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
