import { Suspense } from "react";

import { EmailVerify, LoginFallback } from "@/features/auth";

export default function EmailVerifyPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <EmailVerify />
        </Suspense>
    );
}
