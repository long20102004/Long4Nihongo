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
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";

export default function CoursePage({ params: paramsPromise }) {
  const { user } = useAuth();
  const [contentType, setContentType] = useState("video");
  const [lessons, setLessons] = useState([]);
  const params = use(paramsPromise);
  const { dataList } = useLessons();
  const [flashCards, setFlashCards] = useState([]);
  const [words, setWords] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [haveCourse, setHaveCourse] = useState(false);
  const [video, setVideo] = useState("");
  useEffect(() => {
    setVideo(`/api/video/${encodeURIComponent(dataList.videoUrl)}`);
    // setVideo(dataList.videoUrl);
    const newFlashCards = [];
    const newWords = [];
    const newQuestions = [];
    dataList.flashCards != null &&
      dataList.flashCards.forEach((data) => {
        newFlashCards.push(
          new FlashCardd(data.word, data.meaning, data.example, data.imgUrl)
        );
      });
    dataList.words != null &&
      dataList.words.forEach((data) => {
        newWords.push(new Word(data.hiragana, data.kanji, data.meaning));
      });
    dataList.questions != null &&
      dataList.questions.forEach((data) => {
        newQuestions.push(
          new Question(data.question, data.answers, data.correctAnswer)
        );
      });
    setFlashCards(newFlashCards);
    setWords(newWords);
    setQuestions(newQuestions);
  }, [params.id, user, dataList]);

  // useEffect(() => {
  //   apiFetch(`api/check-course/${params.id}/`, {
  //     method: "POST",
  //   }).then((response) => {
  //     if (response.ok) {
  //       setHaveCourse(true);
  //       console.log("have this course");
  //     } else {
  //       console.log("not have this course");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    apiFetch(`api/course/${params.id}/lessons`)
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
      });
  }, [params.id, user, dataList]);

  return (
    <>
      <SiteHeader></SiteHeader>
      <div className="min-h-screen bg-slate-200 dark:bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <div className="rounded-xl bg-background dark:bg-slate-800/50 backdrop-blur p-6 border border-slate-200 dark:border-slate-700 sticky top-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  DANH SÁCH BÀI HỌC:
                </h2>
                <div className="space-y-4">
                  {lessons.map((section, index) => (
                    <Lesson key={index} lesson={section} index={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-9">
              <div className="rounded-xl bg-background dark:bg-slate-800/50 backdrop-blur p-6 border border-slate-200 dark:border-slate-700">
                <ContentTypeSwitcher
                  activeType={contentType}
                  onChange={setContentType}
                />

                <div className="aspect-video mb-8">
                  {contentType === "video" && (
                    <div className="w-full h-full bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <p className="text-slate-600 dark:text-slate-400">
                        <video controls key={video}>
                          <source type="video/mp4" src={video} />
                        </video>
                      </p>
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
    </>
  );
}
