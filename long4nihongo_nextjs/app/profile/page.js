"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/site-header";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
export default function ProfilePage() {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("fet");
    apiFetch("api/user", {
      method: "POST",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, []);
  return (
    <div className=" mx-auto space-y-8 bg-background">
      <Header />
      <div className="container flex flex-col md:flex-row gap-8">
        {/* Profile Overview */}
        <Card className="flex-1">
          <CardHeader className="relative pb-14">
            <div className="absolute inset-0 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg" />
            <div className="relative z-10 flex flex-col items-center mt-8">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?text=JD" />
                <AvatarFallback>Long</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-0 right-0 gap-2"
              >
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{user?.name || "name"}</h1>
              <p className="text-muted-foreground">Backend Developer</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">Java Spring Boot</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Java</Badge>
              <Badge variant="secondary">Html,css,js</Badge>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user?.username || "username"}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.username}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Full Stack Developer with 5 years of experience..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
