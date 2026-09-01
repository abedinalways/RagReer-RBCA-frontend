import LoginFallback from "@/components/LoginFallback";
import Login from "@/sharedComponents/auth/login";
import { Suspense } from "react";


export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Login />
    </Suspense>
  );
}
