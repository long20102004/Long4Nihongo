import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LessonsProvider } from "@/lib/context/lesson-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TOTC - Course Platform",
  description: "Learn and grow with our wide range of courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LessonsProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
        </LessonsProvider>
      </body>
    </html>
  );
}
