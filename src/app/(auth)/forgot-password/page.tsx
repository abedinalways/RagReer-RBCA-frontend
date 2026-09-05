import { Suspense } from "react";

import { ForgotPasswordForm, LoginFallback } from "@/features/auth";

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <ForgotPasswordForm />
        </Suspense>
    );
}
