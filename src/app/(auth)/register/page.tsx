import LoginFallback from "@/components/LoginFallback";
import Register from "@/features/auth/components/Register";
import { Suspense } from "react";

export default function RegisterPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <Register />
        </Suspense>
    );
}