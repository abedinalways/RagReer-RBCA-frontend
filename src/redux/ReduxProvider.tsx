"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/redux/store";
import { setHydrated } from "@/redux/features/auth/authSlice";

/**
 * Flips the auth store's `hydrated` flag right after mount. Until then every
 * auth-derived selector returns the same "unauthenticated" values on the
 * server and the client's first render, which keeps SSR HTML and hydration
 * in sync (no hydration mismatch on protected workspaces).
 */
function HydrationBoot() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHydrated());
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <HydrationBoot />
      {children}
    </Provider>
  );
}