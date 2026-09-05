"use client";

import { useOtpInput } from "./useOtpInput";
import type { OtpInputProps } from "./otp-input.types";

export function OtpInput({
    value,
    onChange,
    length = 6,
    disabled = false,
    error = false,
    autoFocus = false,
    className = "",
}: OtpInputProps) {
    const {
        otpValues,
        setInputRef,
        handleChange,
        handleKeyDown,
        handlePaste,
    } = useOtpInput({
        value,
        onChange,
        length,
        autoFocus,
    });

    return (
        <div
            className={`flex items-center justify-center gap-2 ${className}`}
        >
            {otpValues.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        setInputRef(index, element);
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    disabled={disabled}
                    aria-label={`OTP digit ${index + 1}`}
                    aria-invalid={error}
                    onChange={(event) => {
                        handleChange(index, event);
                    }}
                    onKeyDown={(event) => {
                        handleKeyDown(index, event);
                    }}
                    onPaste={handlePaste}
                    className={` h-12 w-12 rounded-md border bg-white text-center text-base font-medium text-[#111111]  outline-none transition-all sm:h-14  sm:w-14 ${error ? ` border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 ` : `border-[#D0D5DD] focus:border-[#5B82A8] focus:ring-1 focus:ring-[#5B82A8]
                `
                        }

            disabled:cursor-not-allowed
            disabled:bg-gray-100
    `}
                />
            ))}
        </div>
    );
}