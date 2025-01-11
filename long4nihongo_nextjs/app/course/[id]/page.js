"use client";
import { useState, useEffect } from "react";
import { ContentTypeSwitcher } from "@/components/content-type-switcher";
import { FlashCard } from "@/components/lesson-types/flash-card";
import { Quiz } from "@/components/lesson-types/quiz";
import SiteHeader from "@/components/site-header";
import { apiFetch } from "@/lib/api-fetch";
import { use } from "react";
import Lesson from "./lesson";
import { useLessons } from "@/lib/context/lesson-provider";
import { FlashCardd, Word, Question } from "@/lib/class";

export default function CoursePage({ params: paramsPromise }) {
  const [contentType, setContentType] = useState("video");
  const [lessons, setLessons] = useState([]);
  const params = use(paramsPromise); // Unwrap the params promise
  const { dataList } = useLessons();

  // Move these into state
  const [flashCards, setFlashCards] = useState([]);
  const [words, setWords] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const newFlashCards = [];
    const newWords = [];
    const newQuestions = [];

    dataList.forEach((data) => {
      if (data.type === "flash-card") {
        newFlashCards.push(
          new FlashCardd(data.type, data.word, data.meaning, data.example)
        );
      } else if (data.type === "word") {
        newWords.push(
          new Word(data.type, data.hiragana, data.kanji, data.meaning)
        );
      } else if (data.type === "quiz") {
        newQuestions.push(
          new Question(
            data.type,
            data.question,
            data.answer1,
            data.answer2,
            data.answer3,
            data.answer4,
            data.correctAnswer
          )
        );
      }
    });

    setFlashCards(newFlashCards);
    setWords(newWords);
    setQuestions(newQuestions);
  }, [dataList]);

  useEffect(() => {
    apiFetch(`api/course/${params.id}/lessons`).then((data) => {
      console.log(data);
      setLessons(data);
    });
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background from-slate-950 to-slate-900">
      <SiteHeader></SiteHeader>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <div className="rounded-xl bg-slate-900/50 backdrop-blur p-6 border border-slate-800 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Course Contents
              </h2>
              <div className="space-y-4">
                {lessons.map((section, index) => (
                  <Lesson key={index} lesson={section} index={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <div className="rounded-xl bg-slate-900/50 backdrop-blur p-6 border border-slate-800">
              <ContentTypeSwitcher
                activeType={contentType}
                onChange={setContentType}
              />

              <div className="aspect-video mb-8">
                {contentType === "video" && (
                  <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
                    <p className="text-slate-400">Video content goes here</p>
                  </div>
                )}

                {contentType === "flashcard" && flashCards.length > 0 && (
                  <FlashCard flashcards={flashCards} />
                )}

                {contentType === "quiz" && questions.length > 0 && (
                  <Quiz questions={questions} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
