"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShadowPanel from "./AuthShadowPanel";
import Button from "../button/Button";

import { authRoutes } from "@/lib/auth/config";
import { OtpInput } from "@/components/shared/common/otp-input/OtpInput";
// import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authapi";

export default function OtpVerify() {
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [notice, setNotice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(29);

    // Later RTK Query mutation বসাবে
    // const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    // const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    const email = "alexjo***@gmail.com";

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setNotice("Please enter the 6-digit verification code.");
            return;
        }

        setNotice("");
        setIsLoading(true);

        try {
            /*
             * RTK Query:
             *
             * const response = await verifyOtp({
             *     email,
             *     otp,
             * }).unwrap();
             *
             * if (response.success) {
             *     router.push(authRoutes.login);
             * }
             */

            console.log({
                email,
                otp,
            });

            // Temporary demo
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            router.push(authRoutes.login);
        } catch (error: any) {
            setNotice(
                error?.data?.message ||
                "Invalid verification code. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendTimer > 0) {
            return;
        }

        setNotice("");

        try {
            /*
             * RTK Query:
             *
             * await resendOtp({
             *     email,
             * }).unwrap();
             */

            console.log("Resend OTP:", email);

            setResendTimer(29);
        } catch (error: any) {
            setNotice(
                error?.data?.message ||
                "Unable to resend the verification code."
            );
        }
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
                                    alt="RagReer Logo"
                                    width={220}
                                    height={50}
                                    className="h-auto w-auto"
                                />
                            </div>

                            <div className="mt-8 text-center">
                                <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[32px] lg:text-[34px]">
                                    Verify your Account
                                </h1>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7C859C] sm:mt-3">
                                    Enter the 6-digit code sent to{" "}
                                    <span className="font-medium text-[#4678A8]">
                                        {email}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-8 sm:mt-10">
                                <OtpInput
                                    value={otp}
                                    onChange={(value) => {
                                        setOtp(value);
                                        setNotice("");
                                    }}
                                    length={6}
                                    autoFocus
                                    disabled={isLoading}
                                    error={!!notice}
                                />
                            </div>
                            {notice && (
                                <p className="mt-4 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-[#D14343]">
                                    {notice}
                                </p>
                            )}

                            {/* Verify Button */}
                            <div className="mt-7 sm:mt-8">
                                <Button
                                    type="button"
                                    loading={isLoading}
                                    loadingText="Verifying..."
                                    disabled={
                                        otp.length !== 6 ||
                                        isLoading
                                    }
                                    onClick={handleVerify}
                                    className="h-[50px] w-full rounded-md"
                                >
                                    Verify your Account
                                </Button>
                            </div>

                            {/* Resend Code */}
                            <div className="mt-3 text-center">
                                <p className="text-sm text-[#98A2B3]">
                                    Don't receive the code?{" "}

                                    <button
                                        type="button"
                                        disabled={resendTimer > 0}
                                        onClick={handleResendCode}
                                        className={`
                                            font-medium
                                            transition
                                            ${resendTimer > 0
                                                ? "cursor-not-allowed text-[#98A2B3]"
                                                : "text-[#4678A8] hover:underline"
                                            }
                                        `}
                                    >
                                        Resend Code
                                    </button>

                                    {resendTimer > 0 && (
                                        <span className="ml-1">
                                            (00:
                                            {String(resendTimer).padStart(
                                                2,
                                                "0"
                                            )}
                                            )
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Back to Login */}
                            <p className="mt-6 text-center text-sm text-[#7C859C]">
                                Already have an account?{" "}
                                <Link
                                    href={authRoutes.login}
                                    className="font-semibold text-[#16A34A] transition hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
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