/**
 * lib/utils.ts — tiny dependency-free helpers shared across the app.
 * (Swap for `clsx` + `tailwind-merge` anytime; the API stays `cn()`.)
 */

export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}