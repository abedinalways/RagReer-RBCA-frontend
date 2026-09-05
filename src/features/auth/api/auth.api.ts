import { baseApi } from "@/redux/api/baseApi";
import { handleAuthSuccess } from "@/features/auth/utils/auth.utils";
import type {
  IProfileResponse,
  IUsersResponse,
  LoginParams,
  LoginResponse,
} from "@/features/auth/types/auth.types";

/**
 * Auth endpoints — all auth-related RTK Query endpoints live in the auth
 * feature and inject into the shared `baseApi`. In production these hit the
 * real backend; in design mode the base query resolves them from
 * `redux/api/designMode.ts`.
 */
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          handleAuthSuccess(data, dispatch);
        } catch {
          // handled by the caller via unwrap
        }
      },
    }),
    logoutUser: builder.mutation<{ success?: boolean; message?: string }, void>(
      {
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["User"],
      },
    ),
    getMe: builder.query<IProfileResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query<
      IUsersResponse,
      { search?: string; limit?: number; page?: number }
    >({
      query: (data) => ({
        url: "/auth",
        method: "GET",
        params: {
          search: data?.search,
          limit: data?.limit,
          page: data?.page,
        },
      }),
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation<
      { success?: boolean; message?: string },
      { name: string; email: string; password: string; role?: string, phone?: string }
    >({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<
      { success?: boolean; message?: string },
      { old_password: string; new_password: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resendVerificationEmail: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string; token: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useLogoutUserMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;