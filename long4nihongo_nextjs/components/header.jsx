import { useParticles } from "@/lib/context/particle-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/toggle-button"
import Link from "next/link"

export default function Header() {
  const { isParticlesEnabled, toggleParticles } = useParticles()

  return (
    <header className="border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 bg-background dark:bg-background">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary">
            ロン日本語
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={toggleParticles}
            >
              {isParticlesEnabled ? "Disable" : "Enable"} Particles
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

