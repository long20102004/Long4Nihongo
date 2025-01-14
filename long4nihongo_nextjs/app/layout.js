import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/context/ThemeProvider";
import { LessonsProvider } from "@/lib/context/lesson-provider";
import { AuthProvider } from "@/lib/context/auth-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TOTC - Course Platform",
  description: "Learn and grow with our wide range of courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LessonsProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </LessonsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
