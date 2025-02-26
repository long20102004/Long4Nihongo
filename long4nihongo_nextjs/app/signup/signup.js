"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import GoogleSignIn from "@/components/google-signin";

export default function SignUpPage({ onLoginClick, onClose }) {
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(name, username, password);
      onClose();
    } catch (err) {
      setError("Email was used, choose another email!");
    }
  };

  return (
    <Card className="w-full bg-background border-border">
      <CardHeader className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-muted-foreground">
          Enter your email below to create your account
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="m@example.com"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="password"
            >
              Password
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="w-4 h-4 rounded border-input bg-background text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/90"
              >
                terms and conditions
              </Link>
            </label>
          </div>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
            Sign Up
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignIn />
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-primary hover:text-primary/90 transition-colors"
            onClick={onLoginClick}
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
