import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Mail } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SubtleParticleBackground from "@/components/ui/snow-effect";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SubtleParticleBackground></SubtleParticleBackground>
      <SiteHeader></SiteHeader>

      {/* Hero Section */}
      <section className="relative">
        <div className="container flex min-h-[800px] flex-col items-start justify-center md:flex-row md:items-center md:justify-between">
          {/* Left Column */}
          <div className="flex flex-col space-y-4 md:w-1/2">
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              <span className="text-teal-500">Studying</span> Online is now
              <br />
              much easier
            </h1>
            <p className="text-xl text-muted-foreground">
              TOTC is an interesting platform that will teach you in more an
              interactive way
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Join for free
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4 group-hover:text-teal-500" />
                Watch how it works
              </Button>
            </div>
          </div>

          {/* Right Column with Floating Elements */}
          <div className="relative md:w-1/2">
            <div className="absolute -top-4 left-0 rounded-lg bg-card p-4 shadow-lg">
              <div className="flex items-center space-x-4">
                <Calendar className="h-8 w-8 text-teal-500" />
                <div>
                  <div className="text-sm font-medium">250k</div>
                  <div className="text-xs text-muted-foreground">
                    Assisted Student
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-0 rounded-lg bg-card p-4 shadow-lg">
              <div className="flex items-center space-x-4">
                <Mail className="h-8 w-8 text-teal-500" />
                <div>
                  <div className="text-sm font-medium">Congratulations</div>
                  <div className="text-xs text-muted-foreground">
                    Your admission completed
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-4 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-teal-500" />
                <div>
                  <div className="text-sm font-medium">
                    User Experience Class
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Today at 12.00 PM
                  </div>
                </div>
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                  Join Now
                </Button>
              </div>
            </div>

            <div className="aspect-square rounded-full bg-gradient-to-b from-teal-500/20 to-transparent" />
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 200L60 186.7C120 173.3 240 146.7 360 133.3C480 120 600 120 720 133.3C840 146.7 960 173.3 1080 166.7C1200 160 1320 120 1380 100L1440 80V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0Z"
              fill="currentColor"
              className="fill-muted/20"
            />
          </svg>
        </div>
      </section>

      {/* Success Section */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Our Success</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae
            sollicitudin at nec nam et pharetra gravida. Adipiscing a quis
            ultrices eu ornare tristique vel nisi orci.
          </p>
        </div>
      </section>
    </div>
  );
}
