import { Suspense } from "react";

import LoginFallback from "@/components/LoginFallback";
import ForgotPassword from "@/features/auth/components/ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <ForgotPassword />
        </Suspense>
    );
}
