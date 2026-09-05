/**
 * features/auth — public API.
 *
 * Routes, workspaces and other features should import auth functionality from
 * `@/features/auth` (this barrel) instead of reaching into feature internals.
 * Deep imports are reserved for the redux infrastructure (`src/redux/*`) and
 * the cross-cutting `access-control` layer.
 */
export { default as LoginForm } from "./components/LoginForm";
export { default as RegisterForm } from "./components/RegisterForm";
export { default as EmailVerify } from "./components/EmailVerify";
export { default as ForgotPasswordForm } from "./components/ForgotPasswordForm";
export { default as AuthShadowPanel } from "./components/AuthShadowPanel";
export { default as OtpVerify } from "./components/OtpVerify";
export { default as LoginFallback } from "./components/LoginFallback";
export { SessionLoader } from "./components/SessionLoader";
export { useAuth } from "./hooks/useAuth";
export {
  logOut,
  setCredentials,
  setSessionUser,
  setHydrated,
  selectCurrentRole,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectIsHydrated,
  selectPermissions,
} from "./state/auth.slice";
