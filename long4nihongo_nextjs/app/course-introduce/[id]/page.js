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
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import { useChoosedCourse } from "@/lib/context/course-checkout-content";
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
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { setChoosedCourse } = useChoosedCourse();
  const [hadCourse, setHadCourse] = useState(false);
  const handleCheckout = () => {
    setChoosedCourse([course]);
    localStorage.setItem("choosedCourses", course);
    router.push("/checkout");
  };
  const [courses, setCourseData] = useState([]);
  useEffect(() => {
    apiFetch("api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      });
  }, []);
  const params = use(paramsPromise);
  useEffect(() => {
    apiFetch(`api/course/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
      });

    apiFetch(`api/check-course/${params.id}`, { method: "POST" }).then(
      (response) => {
        if (response.ok) {
          setHadCourse(true);
        }
      }
    );
  }, [params.id, user]);
  const formatPrice = (price) => {
    if (price === undefined) return 0;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header
        onTriggerLogin={trigger}
        setTriggerLogin={setTrigger}
        callLoginFormFromOtherComponents={true}
      ></Header>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src={course.imageUrl || "/window.svg"}
                alt="Course header"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="curriculum">Các bài học</TabsTrigger>
                <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
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
                              <AvatarImage src="/window.svg" />
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold mb-1">Bot</div>
                              <StarRating rating={4} />
                              <p className="text-sm text-muted-foreground mt-2">
                                Khóa học thật sự rất tuyệt vời với những người
                                chuẩn bị bắt đầu học tiếng Nhật
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
                    Còn 11 giờ nữa với mức giá này.
                  </p>
                </div>

                {!hadCourse ? (
                  <>
                    <Link href={`/course/${course.id}`}>
                      <Button className=" w-full mb-2">Học thử</Button>
                    </Link>
                    {user ? (
                      <Button className="w-full mb-6" onClick={handleCheckout}>
                        Đăng ký
                      </Button>
                    ) : (
                      <Button
                        className="w-full mb-6"
                        onClick={() => setTrigger(true)}
                      >
                        Đăng ký
                      </Button>
                    )}
                  </>
                ) : (
                  <Link href={`/course/${course.id}`}>
                    <Button className="w-full mb-6">Vào học</Button>
                  </Link>
                )}

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    Khóa học này bao gồm:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <ShieldCheck className="h-5 w-5 text-teal-500" />
                      <span>Trao đổi trực tiếp với admin</span>
                    </div>
                    <div className="flex gap-2">
                      <DevicePhoneIcon className="h-5 w-5 text-teal-500" />
                      <span>Truy cập trên mọi thiết bị</span>
                    </div>
                    <div className="flex gap-2">
                      <Award className="h-5 w-5 text-teal-500" />
                      <span>Nắm vững 2 bảng chữ cái </span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-5 w-5 text-teal-500" />
                      <span>5 Phần</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Đăng ký nhiều người:
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Liên hệ admin để được nhận mức giá ưu đãi hơn
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Chia sẻ khóa học qua:
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
          <h2 className="text-2xl font-bold mb-6">Tham khảo các khóa học:</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((chosenCourse) => chosenCourse.id !== course.id)

              .map((course, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="font-semibold">
                      <BadgePercent className="w-4 h-4 mr-1" />
                      Tiết kiệm 50%
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={
                            course.imageUrl || "/window.svg?height=80&width=80"
                          }
                          alt={course.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{course.name}</h3>
                        <div className="flex items-center gap-2">
                          <StarRating rating={4} />
                          <span className="text-sm text-muted-foreground">
                            ({course.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Giá gốc:
                        </span>
                        <span className="line-through text-muted-foreground">
                          {course.price * 2}đ
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span>Mua combo</span>
                        <span className="text-xl">${course.price}</span>
                      </div>
                    </div>
                    <Link href={`/course-introduce/${course.id}`}>
                      <Button className="w-full">Xem ngay</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
