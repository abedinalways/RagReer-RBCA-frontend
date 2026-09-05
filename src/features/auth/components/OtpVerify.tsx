"use client";

import { useEffect, useState } from "react";

import { OtpInput } from "@/components/shared/otp-input/OtpInput";
import { getErrorMessage } from "@/lib/getErrorMessage";
import Button from "@/components/ui/Button";

export interface OtpVerifyProps {
    email: string;
    onVerify: (otp: string) => Promise<void> | void;
    onResend?: () => Promise<void> | void;
    heading?: string;
    subtext?: string;
    submitLabel?: string;
    loadingLabel?: string;
    resendQuestion?: string;
    resendLabel?: string;
    resendCooldown?: number;
    initialSecondsLeft?: number;
    autoFocus?: boolean;
}

const OTP_LENGTH = 6;
const DEFAULT_RESEND_COOLDOWN = 30;

const formatCountdown = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function OtpVerify({
    email,
    onVerify,
    onResend,
    heading = "Enter Your Code",
    subtext,
    submitLabel = "Verify",
    loadingLabel = "Verifying...",
    resendQuestion = "Don't receive code?",
    resendLabel = "Resend Again",
    resendCooldown = DEFAULT_RESEND_COOLDOWN,
    initialSecondsLeft,
    autoFocus = true,
}: OtpVerifyProps) {
    const [otp, setOtp] = useState("");
    const [notice, setNotice] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(() =>
        Math.max(0, initialSecondsLeft ?? resendCooldown),
    );

    // 1-second countdown, driven by chained timeouts.
    useEffect(() => {
        if (secondsLeft <= 0) {
            return;
        }

        const timeout = setTimeout(() => {
            setSecondsLeft((current) => Math.max(0, current - 1));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft]);

    // Re-sync when the parent restores the countdown (e.g. after a refresh).
    useEffect(() => {
        if (initialSecondsLeft === undefined) {
            return;
        }

        setSecondsLeft(Math.max(0, initialSecondsLeft));
    }, [initialSecondsLeft]);

    const handleVerify = async () => {
        if (isVerifying) {
            return;
        }

        if (otp.length !== OTP_LENGTH) {
            setNotice(`Please enter the ${OTP_LENGTH}-digit verification code.`);
            return;
        }

        setNotice("");
        setIsVerifying(true);

        try {
            await onVerify(otp);
        } catch (error) {
            setNotice(
                getErrorMessage(
                    error,
                    "Invalid verification code. Please try again.",
                ),
            );
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!onResend || isResending || secondsLeft > 0) {
            return;
        }

        setNotice("");
        setIsResending(true);

        try {
            await onResend();
            setSecondsLeft(resendCooldown);
        } catch (error) {
            setNotice(
                getErrorMessage(
                    error,
                    "Unable to resend the verification code.",
                ),
            );
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center">
                <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[28px]">
                    {heading}
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#7C859C] sm:mt-3">
                    {subtext ?? (
                        <>
                            We sent a {OTP_LENGTH}-digit code to{" "}
                            <span className="font-medium text-[#4678A8]">
                                {email}
                            </span>
                        </>
                    )}
                </p>
            </div>

            <form
                className="mt-7 space-y-5 sm:mt-9"
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleVerify();
                }}
            >
                <div className="space-y-2">
                    <span className="block text-[13px] font-semibold text-[#131A2A]">
                        Verification code
                    </span>

                    <OtpInput
                        value={otp}
                        onChange={(value) => {
                            setOtp(value);
                            setNotice("");
                        }}
                        length={OTP_LENGTH}
                        autoFocus={autoFocus}
                        disabled={isVerifying}
                        error={!!notice}
                    />
                </div>

                {notice && (
                    <p className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-[#D14343]">
                        {notice}
                    </p>
                )}

                <Button
                    type="submit"
                    loading={isVerifying}
                    loadingText={loadingLabel}
                    disabled={otp.length !== OTP_LENGTH}
                    className="h-[50px] w-full rounded-lg"
                >
                    {submitLabel}
                </Button>

                {onResend && (
                    <p className="text-center text-sm text-[#98A2B3]">
                        {resendQuestion}{" "}
                        <button
                            type="button"
                            disabled={secondsLeft > 0 || isResending}
                            onClick={() => void handleResend()}
                            className={`font-medium transition ${secondsLeft > 0 || isResending
                                    ? "cursor-not-allowed text-[#98A2B3]"
                                    : "text-[#4678A8] hover:underline"
                                }`}
                        >
                            {isResending ? "Resending..." : resendLabel}
                        </button>

                        {secondsLeft > 0 && (
                            <span className="ml-1">
                                ({formatCountdown(secondsLeft)})
                            </span>
                        )}
                    </p>
                )}
            </form>
        </div>
    );
}
