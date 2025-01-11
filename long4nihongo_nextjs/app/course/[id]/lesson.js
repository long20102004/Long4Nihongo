import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Clock,
  PlayCircle,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Section from "./section";
import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";

export default function Lesson({ lesson }) {
  const [sections, setSection] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    apiFetch(`api/lessons/${lesson.id}/sections`).then((data) => {
      setSection(data);
    });
  }, []);
  const handleSectionSelect = (sectionId) => {
    setSelectedSectionId(sectionId);
  };
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/80 transition-colors group">
          <div className="flex items-center gap-3">
            <PlayCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
            <div className="min-w-0 text-left flex-1">
              <h3 className="font-medium text-white break-words">
                {lesson.name}
              </h3>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-teal-500 flex-shrink-0" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            isSelected={section.id === selectedId}
            onSelect={() => setSelectedId(section.id)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
