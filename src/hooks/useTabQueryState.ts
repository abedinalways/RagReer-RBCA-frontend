"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";


export function useTabQueryState<T extends string>(
  paramName: string = "stage",
  defaultValue: T,
  validValues?: readonly T[]
): [T, (newTab: T) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = useMemo(() => {
    const raw = searchParams.get(paramName);
    if (!raw) return defaultValue;

    if (validValues && validValues.length > 0) {
      const match = validValues.find(
        (v) => v.toLowerCase() === raw.toLowerCase()
      );
      return match || defaultValue;
    }

    return raw as T;
  }, [searchParams, paramName, defaultValue, validValues]);

  const setTab = useCallback(
    (newTab: T) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
      params.set(paramName, newTab);

      const qs = params.toString();
      const targetUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [router, pathname, searchParams, paramName]
  );

  return [currentTab, setTab];
}
