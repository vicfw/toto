"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  autoLogin,
  getUserInfo,
  type AutoLoginResponse,
  type UserResponse,
} from "@/src/lib/auth";
import TournamentsClient from "@/components/TournamentsClient";
import Loader from "@/components/App/Loader";

export default function AuthWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    async function handleAutoLogin() {
      try {
        const token = searchParams.get("token");
        const hall = searchParams.get("hall");
        const login = searchParams.get("login");

        // For testing: automatically add test query parameters if missing
        if (!token || !hall || !login) {
          const testParams = new URLSearchParams({
            token: "09862456028f1938ad769b62720f6c9d",
            hall: "54564",
            login: "testtttt",
          });
          router.replace(`/?${testParams.toString()}`);
          return;
        }

        // Step 1: Auto-login
        const autoLoginResponse: AutoLoginResponse = await autoLogin({
          token,
          hall,
          login,
        });

        if (autoLoginResponse.status !== "success") {
          setError(autoLoginResponse.error || "Auto-login failed");
          setLoading(false);
          return;
        }

        // Store the sanctum token
        localStorage.setItem("auth_token", autoLoginResponse.sanctumToken);

        // Step 2: Get user info
        const userInfo = await getUserInfo(autoLoginResponse.sanctumToken);
        setUser(userInfo);

        setLoading(false);
      } catch (err) {
        console.error("Auto-login error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setLoading(false);
      }
    }

    handleAutoLogin();
  }, [searchParams]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            No User Data
          </h2>
          <p className="text-gray-600">Unable to load user information</p>
        </div>
      </div>
    );
  }

  return <TournamentsClient />;
}
