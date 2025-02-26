"use client";

import { useAuth } from "@/lib/context/auth-context";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
export default function GoogleSignIn() {
  console.log("signing in with google");
  const { oauthLogin } = useAuth();
  const handleSuccess = async (response) => {
    // console.log("Google Token:", response.credential);
    // console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/google`,
        { token: response.credential },
        { withCredentials: true }
      );
      console.log(res.data);
      oauthLogin(res.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleFailure = (error) => {
    console.error("Google Sign-In failed", error);
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />;
}
