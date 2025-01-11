import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-background p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-2 text-center p-6">
          <Link href="/" className="inline-block mb-6">
            <div className="text-2xl font-bold text-teal-500">TOTC</div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400">
            Enter your email to sign in to your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Link
              className="text-sm text-teal-500 hover:text-teal-400 transition-colors"
              href="/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>
          <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300">
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 transition-all duration-300"
          >
            {/* <FaGoogle className="mr-2 h-4 w-4" /> */}
            Google
          </Button>
        </CardContent>
        <CardFooter className="p-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              className="text-teal-500 hover:text-teal-400 transition-colors"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
