import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    bgColor?: string;
    textColor?: string;
    border?: string;
    icon?: ReactNode;
    loading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
}

export default function Button({
    children,
    bgColor = "#5980A6",
    textColor = "#FFFFFF",
    border = "none",
    icon,
    loading = false,
    loadingText = "Loading...",
    fullWidth = true,
    disabled,
    type = "button",
    className = "",
    style,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-busy={loading}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded px-6 py-3.5 text-sm font-medium leading-5 transition-all duration-200 ease-in-out ${fullWidth ? "w-full" : "w-auto"
                } ${isDisabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:brightness-95 active:scale-[0.99]"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5980A6]/40 focus-visible:ring-offset-2 ${className}`}
            style={{
                backgroundColor: bgColor,
                color: textColor,
                border,
                ...style,
            }}
            {...props}
        >
            {loading ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
}