"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function CourseNode({ course, index, total, scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const isRight = index % 2 === 0;

  // Create a more gradual fade effect based on scroll position
  // Create a more gradual fade effect with an extended "visible" range
  const blur = useTransform(
    scrollProgress,
    [
      (index - 0.9) / total, // Start applying blur earlier
      (index - 0.4) / total, // Fully clear here
      (index + 0.4) / total, // Fully clear here
      (index + 0.9) / total, // Start applying blur later
    ],
    ["blur(3px)", "blur(0px)", "blur(0px)", "blur(3px)"]
  );

  const opacity = useTransform(
    scrollProgress,
    [
      (index - 0.9) / total, // Start fading in earlier
      (index - 0.4) / total, // Fully visible here
      (index + 0.4) / total, // Fully visible here
      (index + 0.9) / total, // Start fading out later
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [
      (index - 0.5) / total, // Earlier starting point
      index / total, // Centered position
      (index + 0.5) / total, // Ending point
    ],
    [200, 0, -200] // Adjust vertical shift to align with center
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
        zIndex: total - index, // Higher courses appear on top
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
            <Card className="w-[500px] bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {course.name}
                </h3>
                <span className="inline-block px-4 py-1.5 text-sm rounded-full bg-primary/20 text-primary mb-4">
                  {course.level}
                </span>
                <p className="text-slate-300 mb-4 text-lg">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-8 pt-0">
                <span className="text-slate-400 text-lg">
                  {course.learningTime}
                </span>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors text-lg">
                  Enroll Now
                </button>
              </CardFooter>
            </Card>
          )}

          <div
            className={`w-[500px] text-slate-300 ${
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
            <Card className="w-[500px] bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {course.name}
                </h3>
                <span className="inline-block px-4 py-1.5 text-sm rounded-full bg-primary/20 text-primary mb-4">
                  {course.level}
                </span>
                <p className="text-slate-300 mb-4 text-lg">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-8 pt-0">
                <span className="text-slate-400 text-lg">
                  {course.learningTime}
                </span>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors text-lg">
                  Enroll Now
                </button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
