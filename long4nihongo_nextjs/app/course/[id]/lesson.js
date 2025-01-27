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
import { useAuth } from "@/lib/context/auth-context";
export default function Lesson({ lesson, setLoading }) {
  const [sections, setSection] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    // if (user) {
    apiFetch(`api/lessons/${lesson.id}/sections`)
      .then((response) => response.json())
      .then((data) => {
        setSection(data);
        setLoading(false);
      });
    // }
  }, [user]);

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between w-full p-4 rounded-lg bg-slate-200 dark:bg-slate-700/50 hover:bg-teal-300 dark:hover:bg-teal-600/80 transition-colors group">
          <div className="flex items-center gap-3">
            <PlayCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <div className="min-w-0 text-left flex-1">
              <h3 className="font-medium text-slate-900 dark:text-white break-words">
                {lesson.name}
              </h3>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
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
