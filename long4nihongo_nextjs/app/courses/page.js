import { Search } from "lucide-react";
import CourseGrid from "@/components/course-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SiteHeader from "@/components/site-header";
import SubtleParticleBackground from "@/components/ui/snow-effect";
import { apiFetch } from "@/lib/api-fetch";

export default async function Home() {
  const courseData = await apiFetch("courses");
  return (
    <div className="min-h-screen text-gray-100 bg-background">
      <SubtleParticleBackground></SubtleParticleBackground>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search your favorite course"
              className="w-full bt-background border-gray-700 focus:border-teal-500 text-white pl-4 pr-12 py-6 rounded-lg transition-all duration-300"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300"
              size="sm"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {[
              "Subject",
              "Partner",
              "Program",
              "Language",
              "Abailability",
              "Learning Type",
            ].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <CourseGrid courseData={courseData} />
      </main>
    </div>
  );
}
