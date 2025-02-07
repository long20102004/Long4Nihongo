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
import LoadingOverlay from "@/components/ui/LoadingOverLay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CoursePage({ params: paramsPromise }) {
  const { user } = useAuth();
  const [contentType, setContentType] = useState("video");
  const [lessons, setLessons] = useState([]);
  const params = use(paramsPromise);
  const { dataList } = useLessons();
  const [flashCards, setFlashCards] = useState([]);
  const [words, setWords] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [video, setVideo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const isContentEmpty = () => {
    return (
      (contentType === "flashcard" && flashCards.length === 0) ||
      (contentType === "quiz" && questions.length === 0) ||
      (contentType === "video" && video === null)
    );
  };
  useEffect(() => {
    setVideo(dataList.videoUrl);
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Chưa đăng nhập!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hãy đăng nhập để xem nội dung này
          </p>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <SiteHeader></SiteHeader>
      {isLoading && <LoadingOverlay></LoadingOverlay>}
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
                    <Lesson
                      setLoading={setLoading}
                      key={index}
                      lesson={section}
                      index={index}
                    />
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
                  {isContentEmpty() ? (
                    <div className="w-full h-full bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <p className="text-slate-600 dark:text-slate-400">
                        Please choose a section to learn. This content is not
                        available.
                      </p>
                    </div>
                  ) : (
                    <>
                      {contentType === "video" && (
                        <div className="w-full h-full bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <video controls key={video} className="w-full h-full">
                            <source type="video/mp4" src={video} />
                          </video>
                        </div>
                      )}

                      {contentType === "flashcard" && (
                        <FlashCard flashcards={flashCards} />
                      )}

                      {contentType === "quiz" && <Quiz questions={questions} />}
                    </>
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
