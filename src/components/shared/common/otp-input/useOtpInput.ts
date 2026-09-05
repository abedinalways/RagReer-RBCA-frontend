"use client";

import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import type {
    ChangeEvent,
    ClipboardEvent,
    KeyboardEvent,
} from "react";

import type {
    OtpInputHandlers,
    UseOtpInputProps,
} from "./otp-input.types";

import {
    createOtpValues,
    sanitizeOtp,
    updateOtpValue,
    clearOtpValue,
} from "./otp-input.utils";

export const useOtpInput = ({
    value,
    onChange,
    length,
    autoFocus = false,
}: UseOtpInputProps) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const otpValues = createOtpValues(value, length);

    const focusInput = useCallback(
        (index: number) => {
            if (index < 0 || index >= length) {
                return;
            }

            const input = inputRefs.current[index];

            if (!input) {
                return;
            }

            input.focus();
            input.select();
        },
        [length],
    );

    const handleChange = useCallback(
        (
            index: number,
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            const digit = sanitizeOtp(event.target.value, 1);

            if (!digit) {
                onChange(clearOtpValue(otpValues, index));
                return;
            }

            const newValue = updateOtpValue(
                otpValues,
                index,
                digit,
            );

            onChange(newValue);

            if (index < length - 1) {
                focusInput(index + 1);
            }
        },
        [
            focusInput,
            length,
            onChange,
            otpValues,
        ],
    );

    const handleKeyDown = useCallback(
        (
            index: number,
            event: KeyboardEvent<HTMLInputElement>,
        ) => {
            switch (event.key) {
                case "Backspace": {
                    event.preventDefault();

                    if (otpValues[index]) {
                        onChange(clearOtpValue(otpValues, index));
                        return;
                    }

                    if (index > 0) {
                        onChange(
                            clearOtpValue(
                                otpValues,
                                index - 1,
                            ),
                        );

                        focusInput(index - 1);
                    }

                    return;
                }

                case "ArrowLeft": {
                    if (index > 0) {
                        event.preventDefault();
                        focusInput(index - 1);
                    }

                    return;
                }

                case "ArrowRight": {
                    if (index < length - 1) {
                        event.preventDefault();
                        focusInput(index + 1);
                    }

                    return;
                }

                default:
                    return;
            }
        },
        [
            focusInput,
            length,
            onChange,
            otpValues,
        ],
    );

    const handlePaste = useCallback(
        (
            event: ClipboardEvent<HTMLInputElement>,
        ) => {
            event.preventDefault();

            const pastedValue = sanitizeOtp(
                event.clipboardData.getData("text"),
                length,
            );

            if (!pastedValue) {
                return;
            }

            onChange(pastedValue);

            const nextIndex = Math.min(
                pastedValue.length,
                length - 1,
            );

            focusInput(nextIndex);
        },
        [
            focusInput,
            length,
            onChange,
        ],
    );

    useEffect(() => {
        if (autoFocus) {
            focusInput(0);
        }
    }, [autoFocus, focusInput]);

    const setInputRef = useCallback(
        (
            index: number,
            element: HTMLInputElement | null,
        ) => {
            inputRefs.current[index] = element;
        },
        [],
    );

    return {
        otpValues,
        setInputRef,
        handleChange,
        handleKeyDown,
        handlePaste,
    } satisfies OtpInputHandlers & {
        otpValues: string[];
        setInputRef: (
            index: number,
            element: HTMLInputElement | null,
        ) => void;
    };
};