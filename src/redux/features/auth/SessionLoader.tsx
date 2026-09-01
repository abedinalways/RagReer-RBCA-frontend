"use client";

import { useEffect } from "react";
import { useGetMeQuery } from "@/redux/features/auth/authapi";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  setSessionUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

/**
 * Sessions are bootstrapped by fetching the current profile (`/auth/me`)
 * once an authenticated session exists. The reducer derives the permission set
 * from the role, keeping the centralized permission matrix authoritative.
 */
export function SessionLoader() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  const { data, isSuccess } = useGetMeQuery(undefined, {
    skip: !isAuthenticated || Boolean(user),
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setSessionUser(data.data));
    }
  }, [data, dispatch, isSuccess]);

  return null;
}