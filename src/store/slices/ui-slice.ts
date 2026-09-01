/**
 * store/slices/ui-slice.ts — presentational UI state shared across workspaces.
 */

import type { StateCreator } from "zustand";
import type { AppStore, UISlice } from "../types";

export const createUISlice: StateCreator<AppStore, [], [], UISlice> = (set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
});