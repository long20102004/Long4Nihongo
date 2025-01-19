"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Header from "@/components/site-header";
export default function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const requirements = [
    { text: "At least 8 characters long", met: password.length >= 8 },
    { text: "Contains at least one number", met: /\d/.test(password) },
    {
      text: "Contains at least one special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
    {
      text: "Contains at least one uppercase letter",
      met: /[A-Z]/.test(password),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate password change
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mx-auto">
      <Header />
      <div className="max-w-md mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Choose a strong password to protect your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new"
                      type={showNewPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input id="confirm" type="password" required />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Password Requirements:</p>
                <ul className="space-y-2 text-sm">
                  {requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-2 ${
                        requirement.met
                          ? "text-green-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {requirement.met ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      {requirement.text}
                    </li>
                  ))}
                </ul>
              </div>

              {success && (
                <Alert className="bg-green-500/15 text-green-500 border-green-500/30">
                  <AlertDescription>
                    Password successfully updated!
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
