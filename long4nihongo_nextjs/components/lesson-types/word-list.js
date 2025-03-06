"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WordList({ words, title = "Vocabulary List" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {/* Header */}
        <div className="grid grid-cols-12 p-4 bg-slate-50 dark:bg-slate-800/50 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="col-span-5 text-center">Hiragana / Katakana</div>
          <div className="col-span-3 text-center">Kanji</div>
          <div className="col-span-4 text-center">Meaning</div>
        </div>
        {/* Word rows */}
        {words.map((word, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-12 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
              hoveredIndex === index && "bg-slate-50 dark:bg-slate-800/50"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="col-span-5 flex items-center justify-center text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-slate-900 dark:text-white text-center">
                    {word.hiragana}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      // Use Speech Synthesis to read the word
                      const utterance = new SpeechSynthesisUtterance(
                        word.hiragana
                      );

                      // Try to set Japanese voice if available
                      const voices = window.speechSynthesis.getVoices();
                      const japaneseVoice = voices.find(
                        (voice) =>
                          voice.lang.includes("ja") || voice.lang.includes("JP")
                      );

                      if (japaneseVoice) {
                        utterance.voice = japaneseVoice;
                      }

                      // Set language to Japanese
                      utterance.lang = "ja-JP";

                      // Speak the word
                      window.speechSynthesis.speak(utterance);
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="sr-only">Play pronunciation</span>
                  </Button>
                </div>
                {word.notes && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                    {word.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-center text-center">
              <span className="text-lg font-medium text-slate-900 dark:text-white">
                {word.kanji}
              </span>
            </div>
            <div className="col-span-4 flex items-center justify-center text-center">
              <span className="text-slate-700 dark:text-slate-300">
                {word.meaning}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
