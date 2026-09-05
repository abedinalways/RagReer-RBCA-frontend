"use client";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/features/auth/state/auth.slice";
import uiReducer from "@/features/ui/state/ui.slice";
import { baseApi } from "@/redux/api/baseApi";

/**
 * Redux store — Redux/RTK Query infrastructure. Feature slices live inside
 * their features (e.g. `features/auth/state/auth.slice.ts`) and are
 * registered here next to the RTK Query `baseApi` slice.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;