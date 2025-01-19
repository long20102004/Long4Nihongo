"use client";

import { motion } from "framer-motion";

export function CoursePath({ progress }) {
  return (
    <svg
      className="absolute left-1/2 -translate-x-1/2 w-px h-full"
      viewBox="0 0 20 2000"
      fill="none"
      preserveAspectRatio="xMidYMin meet"
    >
      <motion.path
        d="M10 0C10 0 -30 250 10 500C50 750 -30 1000 10 1250C50 1500 -30 1750 10 2000"
        stroke="url(#gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{
          pathLength: progress,
          opacity: 1,
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary-dark)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
