"use client";
import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/context/ThemeProvider";
import { LessonsProvider } from "@/lib/context/lesson-provider";
import { AuthProvider } from "@/lib/context/auth-context";
import { CourseProvider } from "@/lib/context/course-provider";
import { CourseCheckOutProvider } from "@/lib/context/course-checkout-content";
import { usePathname } from "next/navigation";
import SubtleParticleBackground from "@/components/ui/snow-effect";
import { Toaster } from "@/components/ui/toaster";
import { BugReportButton } from "@/components/BugReportButton";
import { ParticleProvider, useParticles } from "@/lib/context/particle-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
const inter = Inter({ subsets: ["latin"] });

function RootLayoutContent({ children }) {
  const { isParticlesEnabled } = useParticles();
  const pathname = usePathname();

  let pageTitle = "LongNihongo - Your Path to Japanese Mastery";

  if (pathname === "/my-courses") {
    pageTitle = "My Courses";
  } else if (pathname === "/about") {
    pageTitle = "About Me";
  } else if (pathname === "/courses") {
    pageTitle = "All Courses";
  } else if (pathname.startsWith("/course")) {
    pageTitle = "Course";
  } else if (pathname === "/my-receipts") {
    pageTitle = "My Receipts";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <title>{pageTitle}</title>
      </head>
      <body className={inter.className}>
        {isParticlesEnabled && <SubtleParticleBackground />}
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <CourseProvider>
            <CourseCheckOutProvider>
              <AuthProvider>
                <LessonsProvider>
                  <ThemeProvider attribute="class" defaultTheme="light">
                    {children}
                    <Toaster />
                    <BugReportButton />
                  </ThemeProvider>
                </LessonsProvider>
              </AuthProvider>
            </CourseCheckOutProvider>
          </CourseProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <ParticleProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ParticleProvider>
  );
}
