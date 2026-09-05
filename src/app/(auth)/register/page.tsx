import { Suspense } from "react";

import { LoginFallback, RegisterForm } from "@/features/auth";

export default function RegisterPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <RegisterForm />
        </Suspense>
    );
}