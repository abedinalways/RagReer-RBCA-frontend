"use client";

import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#ffffff",
            color: "#1d1f20",
            border: "1px solid #eaecf0",
            fontSize: "13px",
            fontWeight: 500,
            borderRadius: "8px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
          },
        }}
      />
      {children}
    </ReduxProvider>
  );
}