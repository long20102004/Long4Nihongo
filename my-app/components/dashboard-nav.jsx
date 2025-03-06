import Link from "next/link"
import { BarChart3, BookOpen, GraduationCap, Home, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardNav({ className }) {
  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/courses"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <BookOpen className="h-4 w-4" />
        Courses
      </Link>
      <Link
        href="/students"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <Users className="h-4 w-4" />
        Students
      </Link>
      <Link
        href="/analytics"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="/certificates"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <GraduationCap className="h-4 w-4" />
        Certificates
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}

