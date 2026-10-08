"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess: () => void;
}

export const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  isOpen,
  onClose,
  email,
  onSuccess,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(29);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mask email for display e.g. "siddsa***@gmail.com"
  const maskedEmail = React.useMemo(() => {
    if (!email || !email.includes("@")) return "siddsa***@gmail.com";
    const [user, domain] = email.split("@");
    if (user.length <= 4) return `${user}***@${domain}`;
    return `${user.slice(0, 4)}***@${domain}`;
  }, [email]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(29);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(5, index + digits.length);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    onSuccess();
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(29);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card-bg w-full max-w-[420px] rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden my-auto p-6 sm:p-7 relative animate-in zoom-in-95 duration-150">
        {/* Close Button in Top Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1 rounded-md text-secondary-subheading/70 hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Subtitle matching Figma Screenshot 3 */}
        <div className="text-center mt-2">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-heading">
            Verify your Email Address
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1.5 font-normal">
            Enter the 6-digit code sent to{" "}
            <span className="text-primary-heading font-medium">{maskedEmail}</span>
          </p>
        </div>

        {/* 6-digit OTP Inputs matching Figma Screenshot 3 */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 border border-border bg-input-bg rounded-md text-center text-lg sm:text-xl font-medium text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          ))}
        </div>

        {/* Verify Action Button matching Figma Screenshot 3 */}
        <button
          type="button"
          onClick={handleVerify}
          className="w-full py-2.5 sm:py-3 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs text-center"
        >
          Verify your Email
        </button>

        {/* Resend Code Countdown matching Figma Screenshot 3 */}
        <p className="text-center text-xs text-secondary-subheading mt-3.5">
          Don&apos;t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-secondary-subheading font-medium">
              Resend Code (00:{timer < 10 ? `0${timer}` : timer})
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
