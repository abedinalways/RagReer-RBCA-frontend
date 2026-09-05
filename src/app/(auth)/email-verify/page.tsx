import { Suspense } from "react";

import LoginFallback from "@/components/LoginFallback";
import EmailVerify from "@/features/auth/components/EmailVerify";

export default function EmailVerifyPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <EmailVerify />
        </Suspense>
    );
}
