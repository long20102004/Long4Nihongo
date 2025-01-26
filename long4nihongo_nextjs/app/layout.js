"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/context/ThemeProvider";
import { LessonsProvider } from "@/lib/context/lesson-provider";
import { AuthProvider } from "@/lib/context/auth-context";
import { CourseProvider } from "@/lib/context/course-provider";
const inter = Inter({ subsets: ["latin"] });
import { CourseCheckOutProvider } from "@/lib/context/course-checkout-content";
import { usePathname } from "next/navigation";
// export const metadata = {
//   description:
//     "Dive into Japanese language and culture with Longnihongo. Start learning today!",
//   icons: {
//     icon: "/icon.png",
//     shortcut: "/icon.png", // Optional shortcut icon
//     apple: "/icon.png", // For Apple devices
//   },
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  let pageTitle = "LongNihongo - Your Path to Japanese Mastery"; // default title

  // Dynamically change title based on the pathname
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
        <CourseProvider>
          <CourseCheckOutProvider>
            <AuthProvider>
              <LessonsProvider>
                <ThemeProvider attribute="class" defaultTheme="light">
                  {children}
                </ThemeProvider>
              </LessonsProvider>
            </AuthProvider>
          </CourseCheckOutProvider>
        </CourseProvider>
      </body>
    </html>
  );
}
