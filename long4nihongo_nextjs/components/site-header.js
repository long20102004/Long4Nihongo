"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/ui/toggle-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic } from "lucide-react";
import { useParticles } from "@/lib/context/particle-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, BookOpen, ShoppingCart, Key, LogOut } from "lucide-react";
import { AuthModal } from "@/components/auth-model";
import LoginPage from "@/app/login/login";
import SignUpPage from "@/app/signup/signup";
import { Snowflake } from "lucide-react";

export default function Header({
  onTriggerLogin = () => {},
  setTriggerLogin = () => {},
  callLoginFormFromOtherComponents = false,
}) {
  const [isClient, setIsClient] = useState(false);
  const { isParticlesEnabled, toggleParticles } = useParticles();

  const { user, logout, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };
  useEffect(() => {
    if (callLoginFormFromOtherComponents) setIsLoginModalOpen(onTriggerLogin);
  }, [onTriggerLogin]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (!isLoginModalOpen) {
      setTriggerLogin(false);
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    if (user != null) {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    }
  }, [user]);
  return (
    <header className="border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 bg-background dark:bg-background">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary">
            ロン日本語
          </Link>
          <div className="flex items-center space-x-4"></div>
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Link href="/">Trang chủ</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Link href="/courses">Khóa học</Link>
            </Button>
            {/* <Button
              variant="ghost"
              className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Link href="/careers">Careers</Link>
            </Button> */}

            <Button
              variant="outline"
              className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => (window.location.href = "/ai-voice-chat")}
            >
              <Mic className="mr-2 h-4 w-4" />
              AI Voice Chat
            </Button>

            <Button
              variant="ghost"
              className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Link href="/about">Về LongNihongo</Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            {isClient && localStorage.getItem("active") == 1 ? (
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user !== null ? user.avatarUrl : ""}
                        alt={user !== null ? user.name : ""}
                      />
                      <AvatarFallback>
                        {user ? user.name.charAt(0).toUpperCase() : ""}
                      </AvatarFallback>

                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user !== null ? user.name : ""}
                      </p>
                      <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                        {user !== null ? user.email : ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Thông tin cá nhân</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Khóa học của tôi</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-receipts">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Lịch sử thanh toán</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/change-password">
                      <Key className="mr-2 h-4 w-4" />
                      <span>Đổi mật khẩu</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="outline"
                  className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Đăng ký
                </Button>
              </>
            )}
            <div className="flex justify-end p-4">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleParticles}
              title={
                isParticlesEnabled ? "Disable Particles" : "Enable Particles"
              }
              className="mr-2"
            >
              <Snowflake
                className={
                  isParticlesEnabled ? "text-blue-500" : "text-gray-500"
                }
              />
            </Button>
          </div>
        </nav>
      </div>
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginPage
          onSignUpClick={() => {
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </AuthModal>
      <AuthModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <SignUpPage
          onClose={() => setIsSignUpModalOpen(false)}
          onLoginClick={() => {
            setIsSignUpModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </AuthModal>
    </header>
  );
}
