// "use client";

// import { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Video,
//   BookOpen,
//   Brain,
//   List,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export function LessonSection({ section, onSelectLesson }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const getIcon = (type) => {
//     switch (type) {
//       case "video":
//         return <Video className="h-4 w-4" />;
//       case "flashcard":
//         return <BookOpen className="h-4 w-4" />;
//       case "quiz":
//         return <Brain className="h-4 w-4" />;
//       case "wordlist":
//         return <List className="h-4 w-4" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="border-b border-gray-700 last:border-b-0">
//       <Button
//         variant="ghost"
//         className="w-full flex items-center justify-between p-4 hover:bg-gray-700"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <div className="text-left">
//           <p className="text-white font-medium">{section.title}</p>
//           <p className="text-sm text-gray-400">{section.duration}</p>
//         </div>
//         {isExpanded ? (
//           <ChevronDown className="h-5 w-5 text-gray-400" />
//         ) : (
//           <ChevronRight className="h-5 w-5 text-gray-400" />
//         )}
//       </Button>

//       {isExpanded && (
//         <div className="bg-gray-800">
//           {section.lessons.map((lesson) => (
//             <Button
//               key={lesson.id}
//               variant="ghost"
//               className="w-full flex items-center space-x-3 px-6 py-3 text-left text-gray-300 hover:bg-gray-700"
//               onClick={() => onSelectLesson(lesson)}
//             >
//               {getIcon(lesson.type)}
//               <span>{lesson.title}</span>
//             </Button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
