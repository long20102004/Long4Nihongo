"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function CourseNode({ course, index, total, scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const isRight = index % 2 === 0;

  const blur = useTransform(
    scrollProgress,
    [
      (index - 0.9) / total,
      (index - 0.4) / total,
      (index + 0.4) / total,
      (index + 0.9) / total,
    ],
    ["blur(3px)", "blur(0px)", "blur(0px)", "blur(3px)"]
  );

  const opacity = useTransform(
    scrollProgress,
    [
      (index - 0.9) / total,
      (index - 0.4) / total,
      (index + 0.4) / total,
      (index + 0.9) / total,
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [(index - 0.5) / total, index / total, (index + 0.5) / total],
    [200, 0, -200]
  );

  const scale = useTransform(
    scrollProgress,
    [(index - 0.3) / total, index / total, (index + 0.3) / total],
    [0.9, 1, 0.9]
  );

  return (
    <motion.div
      ref={ref}
      className="min-h-[80vh] py-10 flex items-center justify-center px-4 sticky top-0"
      style={{
        opacity,
        scale,
        filter: blur,
        y,
        zIndex: total - index,
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          className={`flex items-center justify-between w-full`}
          initial={{ x: isRight ? 100 : -100 }}
          animate={{ x: isInView ? 0 : isRight ? 100 : -100 }}
          transition={{ duration: 0.8 }}
        >
          {!isRight && (
            <Card className="w-[500px] bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {course.name}
                </h3>
                <span className="inline-block px-4 py-1.5 text-sm rounded-full bg-primary/20 text-primary mb-4">
                  {course.level}
                </span>
                <p className="text-slate-700 dark:text-slate-300 mb-4 text-lg">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-8 pt-0">
                <span className="text-slate-600 dark:text-slate-400 text-lg">
                  {course.learningTime}
                </span>
                <Link href={`/course-introduce/${course.id}`}>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors text-lg">
                    Đăng ký
                  </button>
                </Link>
              </CardFooter>
            </Card>
          )}

          <div
            className={`w-[500px] text-slate-700 dark:text-slate-300 ${
              isRight ? "text-left" : "text-right"
            }`}
          >
            <p className="text-xl leading-relaxed">
              {isRight
                ? "Take the next step in your educational path. This course offers in-depth knowledge and practical experience to elevate your understanding and capabilities."
                : "Embark on your learning journey with this course. Master new skills, tackle challenging concepts, and prepare yourself for the next level of expertise in your field."}
            </p>
          </div>

          {isRight && (
            <Card className="w-[500px] bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {course.name}
                </h3>
                <span className="inline-block px-4 py-1.5 text-sm rounded-full bg-primary/20 text-primary mb-4">
                  {course.level}
                </span>
                <p className="text-slate-700 dark:text-slate-300 mb-4 text-lg">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-8 pt-0">
                <span className="text-slate-600 dark:text-slate-400 text-lg">
                  {course.learningTime}
                </span>
                <Link href={`/course-introduce/${course.id}`}>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors text-lg">
                    Enroll Now
                  </button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
