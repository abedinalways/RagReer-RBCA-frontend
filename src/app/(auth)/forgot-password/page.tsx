import { Suspense } from "react";

import LoginFallback from "@/components/LoginFallback";
import ForgotPassword from "@/sharedComponents/auth/ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <ForgotPassword />
        </Suspense>
    );
}
