import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

export default function CourseGrid({ courseData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courseData.map((course, index) => (
        <Card
          key={index}
          className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:-translate-y-1"
        >
          <CardHeader className="p-0">
            <img
              src={course.course_img_url}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
              width={300}
              height={200}
            />
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>"{course.category}"</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.time} hours</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-white">
              {course.name}
            </h3>
            <p className="text-gray-400 text-sm">{course.description}</p>
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={course.course_img_url} />
                <AvatarFallback>Long</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300">{course.authorName}</span>
            </div>
            <span className="text-teal-500 font-semibold">${course.price}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
