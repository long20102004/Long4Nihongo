"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import { useEffect, useState } from "react";
import { useChoosedCourse } from "@/lib/context/course-checkout-content";
import { useAuth } from "@/lib/context/auth-context";
import { apiFetch } from "@/lib/api-fetch";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingOverlay from "@/components/ui/LoadingOverLay";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const [paymentUrl, setPaymentUrl] = useState("/window.svg");
  const { choosedCourse, setChoosedCourse } = useChoosedCourse();
  const { user } = useAuth();
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourseData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // if (!user || !choosedCourse) {
    //   setPaymentUrl("/window.svg");
    //   return;
    // }
    apiFetch("api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const storedCourses = localStorage.getItem("choosedCourses");
    if (storedCourses) {
      const courses = JSON.parse(storedCourses);
      setChoosedCourse(courses);
      let curPrice = 0;
      courses.forEach((course) => {
        curPrice += course.price;
      });
      setPrice(curPrice);

      apiFetch("api/handle-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storedCourses,
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setPaymentUrl(data.qrCodeUrl);
        });
    }
  }, []);

  const handleCheck = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup the timer if the component unmounts before the timeout
    () => clearTimeout(timer);
    if (choosedCourse) {
      apiFetch(`api/check-course/${choosedCourse[0].id}`, {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            setIsLoading(false);
            router.push("/my-courses");
          }
        })
        .catch((error) => {
          setError(
            "Hệ thống đang xác nhận. Kiểm tra lại giao dịch và ấn xác nhận lại nha"
          );
        });
    }
  };
  const handleBack = () => {
    router.back();
  };
  const handleApplyCoupon = () => {
    apiFetch("api/check-coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: coupon,
    })
      .then((response) => {
        if (!response.ok) {
          setDiscount(0);
          toast({
            title: "Lỗi!",
            description: "Mã giảm giá không hợp lệ hoặc đã hết hạn!",
          });
        }
        return response.json();
      })
      .then((data) => {
        setDiscount(parseInt(data));
      });
    if (coupon === "DISCOUNT10") {
      setDiscount(price * 0.1);
    } else {
    }
  };

  const handleCopyAccount = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Số tài khoản đã được lưu vào bộ nhớ tạm.",
      });
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Chưa đăng nhập!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hãy đăng nhập để xem nội dung này!
          </p>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <SiteHeader />
      <div className="p-6 min-h-screen container bg-background text-foreground">
        {isLoading && <LoadingOverlay></LoadingOverlay>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-7">
              <h2 className="text-2xl font-semibold mb-6">
                Thanh toán với QR Code
              </h2>
              <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Thông tin tài khoản
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tên tài khoản:
                      </p>
                      <p className="font-medium">HOANG HAI LONG</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Ngân hàng:
                      </p>
                      <p className="font-medium">MB Bank</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Số tài khoản:
                      </p>
                      <div className="flex items-center">
                        <p className="font-medium mr-2">0981952931</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyAccount("0981952931")}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Chi nhánh</p>
                      <p className="font-medium">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur"></div>
                  <div className="relative bg-white p-4 rounded-lg shadow-lg">
                    <Image
                      src={paymentUrl || "/placeholder.svg"}
                      alt="Thanh toán qua QR code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <p className="text-muted-foreground text-sm mt-4 text-center">
                      QR code expires in{" "}
                      <span className="font-semibold text-primary">
                        10 minutes
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button
                  onClick={handleCheck}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Xác nhận thanh toán
                </Button>
                {error && (
                  <div className="text-red-500 mt-4 text-center">{error}</div>
                )}
              </div>
            </Card>

            {/* Offers Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6 flex justify-between items-center">
                Tham khảo thêm các khóa học liên quan:
                <Button variant="link" className="text-primary">
                  See all
                </Button>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses
                  .filter(
                    (course) =>
                      !choosedCourse.some((chosen) => chosen.id === course.id)
                  )
                  .map((course, index) => (
                    <Link
                      href={`course-introduce/${course.id}`}
                      key={course.id}
                    >
                      <Card key={index} className="relative overflow-hidden">
                        <Image
                          src={
                            course.imageUrl ||
                            "/placeholder.svg?height=200&width=300" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={course.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                          <div className="text-2xl font-bold text-white mb-1">
                            50%
                          </div>
                          <p className="text-sm text-gray-200">{course.name}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Khóa học</h2>
              <div className="space-y-4">
                {choosedCourse.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {" "}
                    {/* Added id to key */}
                    <Image
                      src={
                        item.imageUrl || "/placeholder.svg?height=80&width=120"
                      }
                      alt={`Course ${item.name}`}
                      width={120}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description.split(".")[0]}.
                      </p>

                      <p className="text-primary font-semibold mt-1">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Có mã giảm giá?</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nhập mã giảm giá"
                      className="flex-grow"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      Dùng
                    </Button>
                  </div>
                </div>
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Giá gốc</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Giảm giá</span>
                    <span>${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mb-4">
                    <span>Thuế</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Giá cuối</span>
                    <span>${(price - discount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
