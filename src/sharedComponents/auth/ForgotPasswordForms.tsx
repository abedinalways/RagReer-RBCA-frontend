"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { authRoutes } from "@/lib/auth/config";
import Button from "../button/Button";
import { fieldInputClassName, fieldWrapperClassName } from "./Register";

export const formNoticeClassName =
    "rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-[#D14343]";

const StepHeading = ({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) => (
    <div className="text-center">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[28px]">
            {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#7C859C] sm:mt-3">
            {subtitle}
        </p>
    </div>
);

type EmailStepFormProps = {
    isSubmitting: boolean;
    notice: string;
    onSubmit: (email: string) => void | Promise<void>;
};


export function EmailStepForm({
    isSubmitting,
    notice,
    onSubmit,
}: EmailStepFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>({
        mode: "onChange",
        defaultValues: { email: "" },
    });

    return (
        <div className="w-full">
            <StepHeading
                title="Reset Your Password"
                subtitle="Enter your email for the verification code"
            />

            <form
                className="mt-7 space-y-4 sm:mt-9"
                onSubmit={handleSubmit((data) =>
                    void onSubmit(data.email.trim()),
                )}
            >
                <div className="space-y-1.5">
                    <label
                        htmlFor="forgot-password-email"
                        className="block text-[13px] font-semibold text-[#131A2A]"
                    >
                        Email
                    </label>

                    <div className={fieldWrapperClassName}>
                        <Mail
                            className="h-4 w-4 shrink-0 text-[#98A2B3]"
                            strokeWidth={1.75}
                        />
                        <input
                            id="forgot-password-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            className={fieldInputClassName}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Enter a valid email address.",
                                },
                            })}
                        />
                    </div>

                    {errors.email && (
                        <p className="text-xs text-[#D14343]">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {notice && <p className={formNoticeClassName}>{notice}</p>}

                <Button
                    type="submit"
                    loading={isSubmitting}
                    loadingText="Sending Code..."
                    disabled={isSubmitting}
                    className="h-[50px] w-full rounded-lg"
                >
                    Send Code
                </Button>

                <p className="text-center text-sm text-[#7C859C]">
                    Remember your password?{" "}
                    <Link
                        href={authRoutes.login}
                        className="font-semibold text-[#4678A8] transition hover:underline"
                    >
                        Back to login
                    </Link>
                </p>
            </form>
        </div>
    );
}

type NewPasswordFormValues = {
    password: string;
    confirmPassword: string;
};

type NewPasswordStepFormProps = {
    isSubmitting: boolean;
    notice: string;
    onSubmit: (password: string) => void | Promise<void>;
};

export function NewPasswordStepForm({
    isSubmitting,
    notice,
    onSubmit,
}: NewPasswordStepFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<NewPasswordFormValues>({
        mode: "onChange",
        defaultValues: { password: "", confirmPassword: "" },
    });

    const passwordValue = watch("password");

    return (
        <div className="w-full">
            <StepHeading
                title="Set New Password"
                subtitle="Must be at least 8 characters"
            />

            <form
                className="mt-7 space-y-4 sm:mt-9"
                onSubmit={handleSubmit((data) => void onSubmit(data.password))}
            >
                <div className="space-y-1.5">
                    <label
                        htmlFor="new-password"
                        className="block text-[13px] font-semibold text-[#131A2A]"
                    >
                        New Password
                    </label>

                    <div className={fieldWrapperClassName}>
                        <Lock
                            className="h-4 w-4 shrink-0 text-[#98A2B3]"
                            strokeWidth={1.75}
                        />
                        <input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            className={fieldInputClassName}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                        />
                        <button
                            type="button"
                            className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                            ) : (
                                <Eye className="h-4 w-4" strokeWidth={1.75} />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-xs text-[#D14343]">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="confirm-password"
                        className="block text-[13px] font-semibold text-[#131A2A]"
                    >
                        Confirm Password
                    </label>

                    <div className={fieldWrapperClassName}>
                        <Lock
                            className="h-4 w-4 shrink-0 text-[#98A2B3]"
                            strokeWidth={1.75}
                        />
                        <input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            className={fieldInputClassName}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                deps: ["password"],
                                validate: (value) =>
                                    value === passwordValue ||
                                    "Passwords do not match.",
                            })}
                        />
                        <button
                            type="button"
                            className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                            ) : (
                                <Eye className="h-4 w-4" strokeWidth={1.75} />
                            )}
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <p className="text-xs text-[#D14343]">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {notice && <p className={formNoticeClassName}>{notice}</p>}

                <Button
                    type="submit"
                    loading={isSubmitting}
                    loadingText="Setting Password..."
                    disabled={isSubmitting}
                    className="h-[50px] w-full rounded-lg"
                >
                    Set New Password
                </Button>

            </form>
        </div>
    );
}

