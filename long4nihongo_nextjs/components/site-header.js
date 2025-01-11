import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/ui/toggle-button";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 bg-background">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary">
            ABCD
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/courses">Courses</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/careers">Careers</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/blog">Blog</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              variant="outline"
              className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <div className="flex justify-end p-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
