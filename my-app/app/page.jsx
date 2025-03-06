import Link from "next/link";
import {
  PlusCircle,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses, analytics } from "@/lib/data";
import DashboardChart from "@/components/dashboard-chart";
import UserActivityChart from "@/components/user-activity-chart";
import CourseCompletionChart from "@/components/course-completion-chart";
import TopCoursesChart from "@/components/top-courses-chart";
import RecentActivity from "@/components/recent-activity";

export default function Dashboard() {
  // Calculate summary statistics
  const totalStudents = analytics.totalUsers;
  const totalCourses = courses.length;
  const totalLessons = courses.reduce(
    (acc, course) => acc + course.totalLessons,
    0
  );
  const completionRate = analytics.completionRate;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Download Report</Button>
                  <Link href="/courses/new">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Course
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Students
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalStudents.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{analytics.newUsers.lastMonth} new this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Courses
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCourses}</div>
                    <p className="text-xs text-muted-foreground">
                      +{analytics.newCourses.lastMonth} new this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Lessons
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalLessons}</div>
                    <p className="text-xs text-muted-foreground">
                      Across {totalCourses} courses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completion Rate
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {completionRate > analytics.previousCompletionRate
                        ? "+"
                        : ""}
                      {(
                        completionRate - analytics.previousCompletionRate
                      ).toFixed(1)}
                      % from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="bg-muted/60 dark:bg-muted/25 p-1">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-background dark:data-[state=active]:bg-muted"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="data-[state=active]:bg-background dark:data-[state=active]:bg-muted"
                  >
                    Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="courses"
                    className="data-[state=active]:bg-background dark:data-[state=active]:bg-muted"
                  >
                    Courses
                  </TabsTrigger>
                  <TabsTrigger
                    value="engagement"
                    className="data-[state=active]:bg-background dark:data-[state=active]:bg-muted"
                  >
                    Engagement
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Platform Growth</CardTitle>
                      <CardDescription>
                        New users and courses over the past 12 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <DashboardChart data={analytics.monthlyGrowth} />
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-1 lg:col-span-2">
                      <CardHeader>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>
                          Daily active users over the past 30 days
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        <UserActivityChart data={analytics.userActivity} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Top Courses</CardTitle>
                        <CardDescription>By enrollment</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        <TopCoursesChart data={analytics.topCourses} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>
                        New registrations over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <UserActivityChart data={analytics.userActivity} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Completion Rates</CardTitle>
                      <CardDescription>
                        Percentage of users completing each course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <CourseCompletionChart
                        data={analytics.courseCompletionRates}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="engagement" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Engagement</CardTitle>
                      <CardDescription>
                        Time spent on platform per day
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <UserActivityChart data={analytics.userEngagement} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest actions across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity activities={analytics.recentActivities} />
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>Recently updated courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.slice(0, 5).map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center gap-4"
                        >
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {course.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {course.parts.length} parts •{" "}
                              {course.totalLessons} lessons
                            </p>
                          </div>
                          <Link href={`/courses/${course.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Link href="/courses" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Courses
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
