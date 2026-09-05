"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { authRoutes } from "@/lib/auth/config";
import { getErrorMessage } from "@/lib/getErrorMessage";
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
} from "@/redux/features/auth/authapi";
import AuthShadowPanel from "../../../sharedComponents/auth/AuthShadowPanel";
import OtpVerify from "../../../sharedComponents/auth/OtpVerify";
import { EmailStepForm, NewPasswordStepForm } from "../../../sharedComponents/auth/ForgotPasswordForms";

const RESEND_COOLDOWN_SECONDS = 30;
const RESET_TOKEN_STORAGE_KEY = "rgr_forgot_password_reset";
const OTP_EXPIRES_STORAGE_KEY = "rgr_forgot_password_otp_expires_at";

type ForgotPasswordStep = "email" | "otp" | "new-password";

const FORGOT_PASSWORD_STEPS: readonly ForgotPasswordStep[] = [
    "email",
    "otp",
    "new-password",
];

const parseStepParam = (value: string | null): ForgotPasswordStep =>
    (FORGOT_PASSWORD_STEPS as readonly string[]).includes(value ?? "")
        ? (value as ForgotPasswordStep)
        : "email";

const buildStepUrl = (step: ForgotPasswordStep, email?: string) => {
    const params = new URLSearchParams();
    params.set("step", step);

    if (email) {
        params.set("email", email);
    }

    return `${authRoutes.forgotPassword}?${params.toString()}`;
};

type VerifiedReset = { email: string; token: string };

/** Verified code (reset token) + the email it belongs to, from sessionStorage. */
const readVerifiedReset = (): VerifiedReset | null => {
    try {
        const raw = sessionStorage.getItem(RESET_TOKEN_STORAGE_KEY);

        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as Partial<VerifiedReset>;

        if (!parsed.email || !parsed.token) {
            return null;
        }

        return { email: parsed.email, token: parsed.token };
    } catch {
        return null;
    }
};

const storeVerifiedReset = (verifiedReset: VerifiedReset) => {
    sessionStorage.setItem(
        RESET_TOKEN_STORAGE_KEY,
        JSON.stringify(verifiedReset),
    );
};

const markOtpSent = () => {
    sessionStorage.setItem(
        OTP_EXPIRES_STORAGE_KEY,
        String(Date.now() + RESEND_COOLDOWN_SECONDS * 1000),
    );
};

/** Seconds left on the resend cooldown (0 when it has expired). */
const readResendSecondsLeft = () => {
    const expiresAt = Number(
        sessionStorage.getItem(OTP_EXPIRES_STORAGE_KEY) ?? 0,
    );

    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        return 0;
    }

    return Math.ceil((expiresAt - Date.now()) / 1000);
};

const clearFlowStorage = () => {
    sessionStorage.removeItem(RESET_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(OTP_EXPIRES_STORAGE_KEY);
};

export default function ForgotPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const step = parseStepParam(searchParams.get("step"));
    const email = searchParams.get("email")?.trim() ?? "";

    const [notice, setNotice] = useState("");
    const [otpSecondsLeft, setOtpSecondsLeft] = useState(
        RESEND_COOLDOWN_SECONDS,
    );

    const [forgotPassword, { isLoading: isSendingCode }] =
        useForgotPasswordMutation();
    const [resetPassword, { isLoading: isResetting }] =
        useResetPasswordMutation();

    useEffect(() => {
        if (step === "otp" && !email) {
            router.replace(buildStepUrl("email"));
            return;
        }

        if (step === "new-password") {
            if (!email) {
                router.replace(buildStepUrl("email"));
                return;
            }

            if (readVerifiedReset()?.email !== email) {
                router.replace(buildStepUrl("otp", email));
            }
        }
    }, [email, router, step]);

    // Restore the resend countdown when (re)entering the OTP step.
    useEffect(() => {
        if (step !== "otp") {
            return;
        }

        setOtpSecondsLeft(readResendSecondsLeft());
    }, [step]);

    /* ----------------------- step 1: email ----------------------- */

    const handleEmailSubmit = async (submittedEmail: string) => {
        setNotice("");

        try {
            await forgotPassword({ email: submittedEmail }).unwrap();
            markOtpSent();
            router.replace(buildStepUrl("otp", submittedEmail));
        } catch (error) {
            setNotice(
                getErrorMessage(
                    error,
                    "Unable to send the verification code. Please try again.",
                ),
            );
        }
    };

    /* ------------------------ step 2: otp ------------------------ */

    const handleOtpVerified = async (otp: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        storeVerifiedReset({ email, token: otp });
        router.replace(buildStepUrl("new-password", email));
    };

    const handleResendOtp = async () => {
        await forgotPassword({ email }).unwrap();
        markOtpSent();
    };

    /* ------------------- step 3: new password ------------------- */

    const handleNewPasswordSubmit = async (password: string) => {
        const verifiedReset = readVerifiedReset();

        if (!verifiedReset || verifiedReset.email !== email) {
            // Stale or missing verification — restart at the OTP step.
            clearFlowStorage();
            router.replace(buildStepUrl("otp", email));
            return;
        }

        setNotice("");

        try {
            await resetPassword({
                email,
                token: verifiedReset.token,
                password,
            }).unwrap();

            clearFlowStorage();
            router.replace(authRoutes.login);
        } catch (error) {
            setNotice(
                getErrorMessage(
                    error,
                    "Unable to reset the password. Please try again.",
                ),
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
                                    alt="Half Stache Logo"
                                    width={72}
                                    height={72}
                                    priority
                                    className="h-14 w-14 sm:h-16 sm:w-16"
                                />
                            </div>

                            <div className="mt-8">
                                {step === "email" && (
                                    <EmailStepForm
                                        isSubmitting={isSendingCode}
                                        notice={notice}
                                        onSubmit={handleEmailSubmit}
                                    />
                                )}

                                {step === "otp" && !!email && (
                                    <OtpVerify
                                        email={email}
                                        onVerify={handleOtpVerified}
                                        onResend={handleResendOtp}
                                        initialSecondsLeft={otpSecondsLeft}
                                        submitLabel="Verify"
                                    />
                                )}

                                {step === "new-password" && !!email && (
                                    <NewPasswordStepForm
                                        isSubmitting={isResetting}
                                        notice={notice}
                                        onSubmit={handleNewPasswordSubmit}
                                    />
                                )}
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

