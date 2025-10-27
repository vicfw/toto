"use client";

import { Suspense } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import Loader from "@/components/App/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthWrapper />
    </Suspense>
  );
}
