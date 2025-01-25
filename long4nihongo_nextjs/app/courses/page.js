"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CourseNode } from "@/components/course-node";
import { CoursePath } from "@/components/course-path";
import SubtleParticleBackground from "@/components/ui/snow-effect";
import SiteHeader from "@/components/site-header";
import { apiFetch } from "@/lib/api-fetch";
import { useChoosedCourse } from "@/lib/context/course-checkout-content";

export default function CourseJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [courses, setCourseData] = useState([]);

  useEffect(() => {
    apiFetch("api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <SubtleParticleBackground />
      <SiteHeader />
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Lộ trình của bạn
      </motion.h1>
      <div ref={containerRef} className="relative">
        <CoursePath progress={scrollYProgress} />
        {courses.map((course, index) => (
          <CourseNode
            key={course.id}
            course={course}
            index={index}
            total={courses.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
