"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/redux/features/auth/hooks";
import {
  authRoutes,
  normalizeAuthRole,
  resolvePostLoginPath,
} from "@/lib/auth/config";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { env } from "@/lib/env";
import { DESIGN_MODE_DEMO_EMAILS } from "@/redux/api/designMode";
import {
  ROLES,
  ROLE_LABELS,
  type Role,
} from "@/access-control/roles/roles";
import { cn } from "@/lib/utils";
import AuthShadowPanel from "../../../sharedComponents/auth/AuthShadowPanel";
import Button from "../../../sharedComponents/button/Button";
import { fieldInputClassName, fieldWrapperClassName } from "./Register";
import Image from "next/image";

const DEMO_ROLES: Role[] = [
  ROLES.ADMIN,
  ROLES.CUSTOMER,
  ROLES.WORKER,
];

const ROLE_ICONS: Record<Role, string> = {
  [ROLES.ADMIN]: "🏢",
  [ROLES.CUSTOMER]: "🏠",
  [ROLES.WORKER]: "🔧",
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.ADMIN]:
    "Dashboard, CRM, Leads, Customers, Workers, Jobs & Settings.",
  [ROLES.CUSTOMER]:
    "My Requests, Property, Estimations, Contracts, Appointments & Invoices.",
  [ROLES.WORKER]:
    "Home, Jobs, Time-tracking & Profile on the mobile PWA.",
};

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const {
    logIn,
    isLoading,
    isAuthenticated,
    role,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(
        resolvePostLoginPath(role, redirectPath),
      );
    }
  }, [
    isAuthenticated,
    redirectPath,
    role,
    router,
  ]);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    if (isSubmitting) return;

    try {
      setServerError("");
      setIsSubmitting(true);

      const response = await logIn(credentials).unwrap();
      const responseRole = normalizeAuthRole(
        response.type ?? null,
      );

      if (!response.success || !responseRole) {
        throw new Error(
          "Login response did not include a valid user role.",
        );
      }

      router.replace(
        resolvePostLoginPath(
          responseRole,
          redirectPath,
        ),
      );
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "Login failed. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: LoginFormValues) => {
    setServerError("");

    void handleLogin({
      email: data.email.trim(),
      password: data.password,
    });
  };

  const handleDemoRole = (demoRole: Role) => {
    void handleLogin({
      email: DESIGN_MODE_DEMO_EMAILS[demoRole],
      password: "design-mode",
    });
  };

  return (
    <div className="box-border flex min-h-[100dvh] w-full flex-col px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-5 lg:h-[100dvh] lg:overflow-hidden">
      <div className="mx-auto flex w-full  flex-col lg:h-full lg:min-h-0 lg:overflow-hidden">
        <div className="grid w-full flex-1  lg:min-h-0 lg:grid-cols-[6fr_6fr] lg:gap-1">

          <section className="flex min-h-0 flex-col rounded-[26px]  lg:order-2 lg:overflow-y-auto">
            <div className="m-auto w-full max-w-lg">

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
                  Welcome Back
                </h1>
                <p className="mt-2 text-sm leading-6 text-[#7C859C] sm:mt-3">
                  Please sign in with your credentials
                </p>
              </div>

              <form
                className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10"
                onSubmit={handleSubmit(onSubmit)}
              >

                <div className="space-y-1">
                  <label
                    htmlFor="login-email"
                    className="block text-[1.125rem] font-medium text-[#131A2A]"
                  >
                    Email
                  </label>
                  <div className={fieldWrapperClassName}>
                    <Mail className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="login-email"
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
                    htmlFor="login-password"
                    className="block text-[1.125rem] font-medium text-[#131A2A]"
                  >
                    Password
                  </label>
                  <div className={fieldWrapperClassName}>
                    <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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

                {serverError && (
                  <p className="rounded-[14px] border border-red-500 px-4 py-3 text-sm text-[#ea4214]">
                    {serverError}
                  </p>
                )}

                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Logging In..."
                  disabled={isSubmitting || isLoading}
                  className="rounded-md"
                >
                  Login
                </Button>

                <div className="flex justify-evenly items-center gap-2.5">
                  <p className="text-center text-sm text-[#7C859C]">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={authRoutes.register}
                      className="font-semibold text-[#16A34A] transition hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                  <p className="mt-2 text-center text-sm text-[#7C859C]">
                    <Link
                      href={authRoutes.forgotPassword}
                      className="font-semibold text-[#16A34A] transition hover:underline"
                    >
                      Forget Password
                    </Link>
                  </p>
                </div>
              </form>

              {/* =========================
                  Design Mode
              ========================== */}
              {env.designMode && (
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />

                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Design mode
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="mt-4 space-y-3">
                    {DEMO_ROLES.map(
                      (demoRole) => (
                        <button
                          key={demoRole}
                          type="button"
                          onClick={() =>
                            handleDemoRole(
                              demoRole,
                            )
                          }
                          disabled={
                            isLoading ||
                            isSubmitting
                          }
                          className={cn(
                            "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                            "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70",
                          )}
                        >
                          <span
                            className="text-2xl"
                            aria-hidden
                          >
                            {
                              ROLE_ICONS[
                              demoRole
                              ]
                            }
                          </span>

                          <span>
                            <span className="block text-sm font-semibold text-slate-900">
                              {
                                ROLE_LABELS[
                                demoRole
                                ]
                              }
                            </span>

                            <span className="mt-0.5 block text-xs text-slate-500">
                              {
                                ROLE_DESCRIPTIONS[
                                demoRole
                                ]
                              }
                            </span>
                          </span>
                        </button>
                      ),
                    )}
                  </div>

                  <p className="mt-6 text-center text-xs text-slate-400">
                    Demo sign-in — resolves
                    against mocked data.
                    Set{" "}
                    <code className="rounded bg-slate-100 px-1 py-0.5">
                      NEXT_PUBLIC_DESIGN_MODE=false
                    </code>{" "}
                    to hit the real API.
                  </p>
                </div>
              )}
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