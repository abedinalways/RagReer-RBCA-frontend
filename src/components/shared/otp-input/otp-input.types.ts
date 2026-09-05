import type {
    ChangeEvent,
    ClipboardEvent,
    KeyboardEvent,
} from "react";

export interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
    className?: string;
}

export interface UseOtpInputProps {
    value: string;
    onChange: (value: string) => void;
    length: number;
    autoFocus?: boolean;
}

export interface OtpInputHandlers {
    handleChange: (
        index: number,
        event: ChangeEvent<HTMLInputElement>,
    ) => void;

    handleKeyDown: (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) => void;

    handlePaste: (
        event: ClipboardEvent<HTMLInputElement>,
    ) => void;
}