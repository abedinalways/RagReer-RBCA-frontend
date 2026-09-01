import { baseApi } from "@/redux/api/baseApi";
import type {
  IProfileResponse,
  IUsersResponse,
} from "@/types/auth";

/**
 * Auth endpoints — mirrors `zvonsystem-dashboard/src/redux/features/auth/authapi.ts`.
 * In production these hit the real backend; in design mode the base query
 * resolves them from `redux/api/designMode.ts`.
 */
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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