import { Button } from "@/components/ui/button";
import { FacebookIcon, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site-header";
export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="p-8 bg-background flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="https://cdn.longnihongo.com/mypic.png"
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Hoàng Hải Long
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  A passionate backend developer with a love for creating
                  sustainable and scalable backend. Always learning, always
                  growing.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <SocialButton
                  href="https://www.facebook.com/1000137975412091I"
                  icon={<FacebookIcon size={24} />}
                  label="Facebook"
                  color="bg-blue-600"
                />
                <SocialButton
                  href="mailto:hoanghailonguyno@gmail.com"
                  icon={<Mail size={24} />}
                  label="Email"
                  color="bg-red-600"
                />
                <SocialButton
                  href="https://github.com/long20102004"
                  icon={<Github size={24} />}
                  label="GitHub"
                  color="bg-gray-800"
                />
                <SocialButton
                  href="https://www.linkedin.com/in/long-h%E1%BA%A3i-0b9732248/"
                  icon={<Linkedin size={24} />}
                  label="LinkedIn"
                  color="bg-blue-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SocialButton({ href, icon, label, color }) {
  return (
    <Link href={href} passHref>
      <Button
        variant="outline"
        className={`w-full ${color} text-white hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
      >
        <span className="flex items-center justify-center">
          {icon}
          <span className="ml-2">{label}</span>
        </span>
      </Button>
    </Link>
  );
}
