"use client";

import type { PropsWithChildren } from "react";
import ReduxProvider from "@/redux/ReduxProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      {/* future providers go here */}
      {children}
    </ReduxProvider>
  );
}