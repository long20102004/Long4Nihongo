"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Award,
  PhoneIcon as DevicePhoneIcon,
  ShieldCheck,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Youtube,
  Instagram,
  BadgePercent,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/site-header";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api-fetch";
function StarRating({ rating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ stars, percentage }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-12">{stars} Stars</span>
      <div className="h-2 flex-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-teal-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function CoursePage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  const [course, setCourse] = useState([]);
  useEffect(() => {
    apiFetch(`api/course/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
      });
  }, [params.id]);
  const formatPrice = (price) => {
    if (price === undefined) return 0;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header></Header>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden">
              {/* <Image
                src={null}
                // src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TaaB5TjNNHcSCLKTuSZhYYKZq9vKw7.png`}
                alt="Course header"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              /> */}
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">4.0</div>
                          <div className="text-sm text-muted-foreground">
                            out of 5
                          </div>
                          <StarRating rating={4} />
                          <div className="text-sm text-muted-foreground mt-1">
                            Top Rating
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <RatingBar stars={5} percentage={75} />
                          <RatingBar stars={4} percentage={60} />
                          <RatingBar stars={3} percentage={40} />
                          <RatingBar stars={2} percentage={20} />
                          <RatingBar stars={1} percentage={5} />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[1, 2].map((review) => (
                          <div key={review} className="flex gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold mb-1">Lina</div>
                              <StarRating rating={4} />
                              <p className="text-sm text-muted-foreground mt-2">
                                Class, launched less than a year ago by
                                Blackboard co-founder Michael Chasen, integrates
                                exclusively...
                              </p>
                              <div className="text-sm text-muted-foreground mt-1">
                                1 Month ago
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex flex-col gap-2 mb-2">
                    <span className="text-5xl font-bold">{course.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold">
                        {formatPrice(course.price)}
                        <span className="text-sm align-top ml-1">VNĐ</span>
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(course.price * 2)}
                        <span className="text-sm align-top ml-1">VNĐ</span>
                      </span>
                      <Badge variant="secondary" className="text-sm">
                        50% Off
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    11 hours left at this price
                  </p>
                </div>
                <Link href={`/checkout?price=${course.price}`}>
                  <Button className="w-full mb-6">Buy Now</Button>
                </Link>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    This Course included
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <ShieldCheck className="h-5 w-5 text-teal-500" />
                      <span>Money Back Guarantee</span>
                    </div>
                    <div className="flex gap-2">
                      <DevicePhoneIcon className="h-5 w-5 text-teal-500" />
                      <span>Access on all devices</span>
                    </div>
                    <div className="flex gap-2">
                      <Award className="h-5 w-5 text-teal-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-5 w-5 text-teal-500" />
                      <span>12 Modules</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Training 5 or more people?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Class, launched less than a year ago by Blackboard co-founder
                  Michael Chasen, integrates exclusively...
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Share this course
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Youtube className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Combo Deals Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Special Course Bundles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="font-semibold">
                  <BadgePercent className="w-4 h-4 mr-1" />
                  Save 25%
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Course 1"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      Business Strategy + Team Management
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={4} />
                      <span className="text-sm text-muted-foreground">
                        (4.5)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Individual Price
                    </span>
                    <span className="line-through text-muted-foreground">
                      $199.98
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Bundle Price</span>
                    <span className="text-xl">$149.99</span>
                  </div>
                </div>
                <Button className="w-full">Get Bundle Deal</Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="font-semibold">
                  <BadgePercent className="w-4 h-4 mr-1" />
                  Save 30%
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Course 2"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      Project Management + Leadership Skills
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={5} />
                      <span className="text-sm text-muted-foreground">
                        (4.8)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Individual Price
                    </span>
                    <span className="line-through text-muted-foreground">
                      $249.98
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Bundle Price</span>
                    <span className="text-xl">$174.99</span>
                  </div>
                </div>
                <Button className="w-full">Get Bundle Deal</Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="font-semibold">
                  <BadgePercent className="w-4 h-4 mr-1" />
                  Save 35%
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Course 3"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      Complete Management Bundle
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={5} />
                      <span className="text-sm text-muted-foreground">
                        (4.9)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Individual Price
                    </span>
                    <span className="line-through text-muted-foreground">
                      $299.97
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Bundle Price</span>
                    <span className="text-xl">$194.99</span>
                  </div>
                </div>
                <Button className="w-full">Get Bundle Deal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
