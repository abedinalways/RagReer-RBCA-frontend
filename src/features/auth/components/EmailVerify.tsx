"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { authRoutes } from "@/lib/auth/config";
import { useResendVerificationEmailMutation } from "@/redux/features/auth/authapi";
import AuthShadowPanel from "../../../sharedComponents/auth/AuthShadowPanel";
import OtpVerify from "../../../sharedComponents/auth/OtpVerify";

/** Fallback for the design/demo flow when no email is provided in the URL. */
const DEMO_MASKED_EMAIL = "alexjo***@gmail.com";

/**
 * Full-page shell for the account email-verification flow. The OTP form
 * itself lives in the reusable `OtpVerify` component, which is shared with
 * the 3-step forgot-password flow.
 */
export default function EmailVerify() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email")?.trim() || DEMO_MASKED_EMAIL;

    const [resendVerificationEmail] = useResendVerificationEmailMutation();

    const handleVerify = async () => {
        /*
         * No dedicated verify-otp endpoint yet — plug the RTK Query mutation
         * here once the backend exposes it. The short delay keeps the
         * button's loading state visible in the meantime.
         */
        await new Promise((resolve) => setTimeout(resolve, 800));

        router.push(authRoutes.login);
    };

    const handleResend = async () => {
        await resendVerificationEmail({ email }).unwrap();
    };

    return (
        <div className="box-border flex min-h-[100dvh] w-full flex-col px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-5 lg:h-[100dvh] lg:overflow-hidden">
            <div className="mx-auto flex w-full flex-col lg:h-full lg:min-h-0 lg:overflow-hidden">
                <div className="grid w-full flex-1 gap-2 lg:min-h-0 lg:grid-cols-[6fr_6fr] lg:gap-1">
                    <section className="flex min-h-0 flex-col rounded-[26px] px-1 py-4 sm:px-4 sm:py-6 lg:order-2 lg:overflow-y-auto">
                        <div className="m-auto w-full max-w-md">
                            {/* Logo */}
                            <div className="flex justify-center">
                                <Image
                                    src="/images/website_logo.webp"
                                    alt="Half Stache Logo"
                                    width={72}
                                    height={72}
                                    priority
                                    className="h-14 w-14 sm:h-16 sm:w-16"
                                />
                            </div>

                            <div className="mt-8">
                                <OtpVerify
                                    email={email}
                                    onVerify={handleVerify}
                                    onResend={handleResend}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="hidden min-h-0 overflow-hidden lg:order-1 lg:block">
                        <AuthShadowPanel
                            title="HALF STACHE"
                            description="Over 100,000 home service pros in 80+ industries trust us"
                            imageSrc="/images/auth_img.webp"
                            logoSrc="/images/website_logo.webp"
                            imageAlt="Auth background"
                            logoAlt="Website logo"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
