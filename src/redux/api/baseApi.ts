import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/lib/env";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { buildDesignModeResponse } from "@/redux/api/designMode";
import { extractAuthTokens } from "@/features/auth/utils/auth.utils";
import { logOut, setCredentials } from "@/features/auth/state/auth.slice";
import type { RootState } from "@/redux/store";
import type { RefreshTokenResponse } from "@/features/auth/types/auth.types";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    headers.set("accept", "*/*");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("access_token", token);
    }

    return headers;
  },
});

let refreshPromise: Promise<
  QueryReturnValue<unknown, FetchBaseQueryError>
> | null = null;

const baseQueryWithDesignMode: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Design mode (NEXT_PUBLIC_DESIGN_MODE=true) → never touch the network.
  if (env.designMode) {
    return {
      data: buildDesignModeResponse(args),
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  const isRefreshRequest =
    typeof args === "object" && "url" in args
      ? args.url === "/auth/refresh-token"
      : args === "/auth/refresh-token";

  if (result.error?.status === 401 && !isRefreshRequest) {
    const state = api.getState() as RootState;
    const { token, refreshToken, role } = state.auth;

    if (token && refreshToken) {
      try {
        if (!refreshPromise) {
          refreshPromise = Promise.resolve(
            baseQuery(
              {
                url: "/auth/refresh-token",
                method: "POST",
                headers: {
                  access_token: token,
                  Authorization: `Bearer ${token}`,
                },
              },
              api,
              extraOptions,
            ),
          );
        }

        const refreshResult = await refreshPromise;
        refreshPromise = null;

        if (!("data" in refreshResult) || !refreshResult.data) {
          throw new Error("Session refresh failed.");
        }

        const refreshedTokens = extractAuthTokens(
          refreshResult.data as RefreshTokenResponse,
        );

        if (!refreshedTokens.accessToken) {
          throw new Error(
            "Refresh token response did not include an access token.",
          );
        }

        api.dispatch(
          setCredentials({
            token: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken ?? refreshToken,
            role,
          }),
        );

        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        refreshPromise = null;
        api.dispatch(logOut());

        // if (typeof window !== "undefined") {
        //   window.location.href = "/login";
        // }

        console.error(
          getErrorMessage(error, "Session expired. Please log in again."),
        );
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithDesignMode,
  tagTypes: ["User"],
  /**
   * No endpoints here on purpose — `baseApi` is infrastructure only (base
   * query, auth-token refresh, design mode). Features inject their own
   * endpoints, e.g. `features/auth/api/auth.api.ts`.
   */
  endpoints: () => ({}),
});