/**
 * store/store.ts — single zustand store assembled from slices.
 *
 * Access-control hooks (`usePermission`, `useRole`) and workspace layouts read
 * exclusively from here, keeping the session/permission state in one place.
 */

import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createUISlice } from "./slices/ui-slice";
import type { AppStore } from "./types";

export const useAppStore = create<AppStore>()((...api) => ({
  ...createAuthSlice(...api),
  ...createUISlice(...api),
}));

export type { AppStore };
export { default as StoreProvider } from "./provider";