import type { Role } from "@/access-control/roles/roles";

/**
 * Auth domain types — mirrors `zvonsystem-dashboard/src/types/auth.ts`, adapted
 * to the RagReer role set (ADMIN / CUSTOMER / WORKER).
 */
export type AuthRole = Role;

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  type?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  authorization?: AuthTokenPayload;
  data?: AuthTokenPayload;
  type?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  authorization?: AuthTokenPayload;
  data?: AuthTokenPayload;
  type?: string;
}

/** Minimal user profile returned by the backend (`/auth/me`). */
export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role?: Role | string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export type IProfileResponse = IApiResponse<IUserProfile>;

export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUserProfile[];
}

export interface IPaginationMeta {
  total: number;
  page: number;
  last_page: number;
  limit: number;
}