import { Suspense } from "react";

import { LoginFallback, LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
