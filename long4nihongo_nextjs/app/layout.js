import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/context/ThemeProvider";
import { LessonsProvider } from "@/lib/context/lesson-provider";
import { AuthProvider } from "@/lib/context/auth-context";
import { CourseProvider } from "@/lib/context/course-provider";
const inter = Inter({ subsets: ["latin"] });
import { CourseCheckOutProvider } from "@/lib/context/course-checkout-content";
export const metadata = {
  title: "TOTC - Course Platform",
  description: "Learn and grow with our wide range of courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
