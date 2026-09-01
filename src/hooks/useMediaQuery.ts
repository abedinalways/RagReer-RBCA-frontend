"use client";

import { useEffect, useState } from "react";

/** Shared hook — used to switch between desktop / mobile workspace layouts. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}