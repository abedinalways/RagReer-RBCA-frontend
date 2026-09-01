
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/redux/features/auth/authapi";
import AuthShadowPanel from "./AuthShadowPanel";
import { authRoutes } from "@/lib/auth/config";
import Button from "../button/Button";

type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

export const fieldWrapperClassName =
    "flex h-[50px] items-center gap-2.5 rounded-[12px] border border-border/30 bg-layout-bg px-4 transition focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/3";
export const fieldInputClassName =
    "h-full w-full bg-transparent text-[1rem]  outline-none text-primary-dark placeholder:text-[1rem] focus:outline-none ";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [notice, setNotice] = useState("");
    const [signUp, { isLoading }] = useSignUpMutation();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        mode: "onChange",
        defaultValues: { name: "", email: "", password: "", confirmPassword: "", phone: "" },
    });

    const onSubmit = async (data: SignUpFormValues) => {
        clearErrors("confirmPassword");
        setNotice("");

        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "validate",
                message: "Passwords do not match.",
            });
            return;
        }

        try {
            const response: any = await signUp({ name: data.name, email: data.email, password: data.password, phone: data.phone }).unwrap();
            if (response.success) {
                setNotice(response?.data?.message);
                router.push(authRoutes.login);
            }
        } catch (error: any) {
            console.log(error);
            setNotice(error?.data?.message);
        }
    };

    return (
        <div className="box-border flex min-h-[100dvh] w-full flex-col px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-5 lg:h-[100dvh] lg:overflow-hidden">
            <div className="mx-auto flex w-full flex-col lg:h-full lg:min-h-0 lg:overflow-hidden">
                <div className="grid w-full flex-1 gap-2 lg:min-h-0 lg:grid-cols-[6fr_6fr] lg:gap-1">
                    <section className="flex min-h-0 flex-col rounded-[26px] px-1 py-4 sm:px-4 sm:py-6 lg:order-2 lg:overflow-y-auto">
                        <div className="m-auto w-full max-w-md">
                            <div className="flex justify-center">
                                <Image
                                    src="/images/website_logo.webp"
                                    alt="RagReer Logo"
                                    width={220}
                                    height={50}
                                    className="w-auto h-auto"
                                />
                            </div>

                            <div className="text-center">
                                <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[32px] lg:text-[34px]">
                                    Create Account
                                </h1>
                                <p className="mt-2 text-sm leading-6 text-[#7C859C] sm:mt-3">
                                    Please register by filling your data
                                </p>
                            </div>

                            <form
                                className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="space-y-1">
                                    <label
                                        htmlFor="signup-name"
                                        className="block text-[1.125rem] font-medium text-[#131A2A]"
                                    >
                                        Your Full Name
                                    </label>
                                    <div className={fieldWrapperClassName}>
                                        <User className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                                        <input
                                            id="signup-name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Enter your Name"
                                            className={fieldInputClassName}
                                            {...register("name", { required: "Name is required" })}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-[#D14343]">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor="signup-email"
                                        className="block text-[1.125rem] font-medium text-[#131A2A]"
                                    >
                                        Email
                                    </label>
                                    <div className={fieldWrapperClassName}>
                                        <Mail className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                                        <input
                                            id="signup-email"
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
                                        <p className="text-xs text-[#D14343]">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="signup-phone"
                                        className="block text-[1.125rem] font-medium text-[#131A2A]"
                                    >
                                        Phone
                                    </label>
                                    <div className={fieldWrapperClassName}>
                                        <Phone className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                                        <input
                                            id="signup-phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            placeholder="Enter your Phone Number"
                                            className={fieldInputClassName}
                                            {...register("phone", {
                                                required: "Phone is required",
                                            })}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-xs text-[#D14343]">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor="signup-password"
                                        className="block text-[1.125rem] font-medium text-[#131A2A]"
                                    >
                                        Password
                                    </label>
                                    <div className={fieldWrapperClassName}>
                                        <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Enter your Password"
                                            className={fieldInputClassName}
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters.",
                                                },
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                                            ) : (
                                                <Eye className="h-4 w-4" strokeWidth={1.75} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-[#D14343]">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor="signup-confirm-password"
                                        className="block text-[1.125rem] font-medium text-[#131A2A]"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className={fieldWrapperClassName}>
                                        <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                                        <input
                                            id="signup-confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="Enter your Password"
                                            className={fieldInputClassName}
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password.",
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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

                                <label className="flex cursor-pointer items-start gap-2 text-[13px] leading-5 text-[#667085]">
                                    <input
                                        type="checkbox"
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#D0D5DD] bg-white checked:border-primary checked:bg-primary"
                                        style={{
                                            backgroundImage: agreeToTerms
                                                ? 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 16 16%22 fill=%22%23101828%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L12.72 4.22a.75.75 0 0 1 1.06 0Z%22/%3E%3Cpath d=%22M2.22 9.28a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L3.28 9.28a.75.75 0 0 0-1.06 0Z%22/%3E%3C/svg%3E")'
                                                : "none",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    />
                                    <span>
                                        I agree to the{" "}
                                        <span className="font-medium text-[#16A34A]">Terms of Service</span> and{" "}
                                        <span className="font-medium text-[#16A34A]">Privacy Policy</span>
                                    </span>
                                </label>

                                {notice && (
                                    <p className="rounded-[14px] border border-red-500  px-4 py-3 text-sm text-[#ea4214]">
                                        {notice}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    loading={isLoading}
                                    loadingText="Creating Account..."
                                    disabled={isSubmitting || isLoading}
                                    className="rounded-md"
                                >
                                    Create Account
                                </Button>

                                <p className="text-center text-sm text-[#7C859C]">
                                    Already have an account?{" "}
                                    <Link
                                        href={authRoutes.login}
                                        className="font-semibold text-[#16A34A] transition hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
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
