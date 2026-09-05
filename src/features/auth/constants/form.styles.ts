/**
 * Shared form field styling for the auth flows (login, register and the
 * forgot-password step forms). Single source of truth so all auth screens
 * stay visually consistent.
 */
export const fieldWrapperClassName =
    "flex h-[50px] items-center gap-2.5 rounded-[12px] border border-border/30 bg-layout-bg px-4 transition focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/3";

export const fieldInputClassName =
    "h-full w-full bg-transparent text-[1rem]  outline-none text-primary-dark placeholder:text-[1rem] focus:outline-none ";
