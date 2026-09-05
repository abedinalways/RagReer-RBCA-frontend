# Architecture

Production-grade **feature-based + role-based workspace** architecture for the
Next.js App Router app (Admin / Customer / Worker on one codebase, one API).

```
src/
├── app/                      # ROUTING ONLY — pages, layouts, route groups
│   ├── (auth)/               #   login / register / email-verify / forgot-password
│   └── (protected)/          #   admin/ · customer/ · worker/ (role-guarded)
│
├── features/                 # BUSINESS LOGIC — one folder per domain
│   ├── auth/
│   │   ├── api/              #   auth.api.ts   → RTK Query endpoints (inject baseApi)
│   │   ├── components/       #   LoginForm, RegisterForm, OtpVerify, SessionLoader…
│   │   ├── constants/        #   form.styles.ts (shared auth form styling)
│   │   ├── hooks/            #   useAuth.ts
│   │   ├── state/            #   auth.slice.ts (Redux slice owned by the feature)
│   │   ├── types/            #   auth.types.ts (API contract types)
│   │   ├── utils/            #   auth.utils.ts (token extraction, mock logins)
│   │   └── index.ts          #   PUBLIC API — import from `@/features/auth`
│   ├── leads/                #   reference feature module (api/components/hooks/…)
│   ├── invoices/  jobs/  ui/ #   grow only the folders a feature actually needs
│   └── …
│
├── components/
│   ├── ui/                   # Generic UI primitives (Button) — no business knowledge
│   └── shared/               # App-wide reusable components (LogoutButton, otp-input…)
│
├── workspaces/               # ROLE SHELLS — how the app looks per role
│   ├── admin/    (components/ layouts/ navigation/)
│   ├── customer/ (components/ layouts/ navigation/)
│   └── worker/   (components/ layouts/ navigation/)
│
├── access-control/           # Cross-cutting RBAC — roles, permissions, guards, hooks
├── redux/                    # Redux INFRASTRUCTURE only
│   ├── api/baseApi.ts        #   base query + token refresh + design mode (no endpoints)
│   ├── ReduxProvider.tsx
│   └── store.ts
├── providers/                # Global React providers (AppProviders)
├── lib/                      # Technical infrastructure (env, api-client, auth config)
├── hooks/  types/  utils/  config/   # Truly global hooks / types / utils / config
└── proxy.ts                  # Edge/middleware proxy (cookie-based route guarding)

## Responsibility map

| Folder              | Owns                                                    | Never contains                     |
| ------------------- | ------------------------------------------------------- | ---------------------------------- |
| `app/`              | Routing, pages, layouts, Suspense                        | Business logic                     |
| `features/*`        | Domain logic: api, state, components, hooks, schemas     | Route files                        |
| `components/ui`     | Generic primitives (Button, Input…)                      | Business/domain concepts           |
| `components/shared` | App-wide components (LogoutButton, otp-input)            | Feature-specific components        |
| `workspaces/*`      | Role shells: headers, sidebars, navigation, layouts      | Business/domain logic              |
| `access-control/`   | Roles, permissions, guards, useRole/usePermission        | API calls                          |
| `redux/`            | Store, baseApi (refresh + design mode), provider         | Feature slices or endpoints        |
| `lib/`              | Technical infra (env, client, config)                    | Business logic                     |
| `types/`            | Global shared types only                                 | Feature types (live in `features/*/types`) |

## Key rules

1. **Feature-owned state** — a feature's Redux slice + RTK Query endpoints live
   inside the feature (`features/auth/state`, `features/auth/api`). Features
   inject endpoints into the shared `baseApi` (`injectEndpoints`) — one
   `createApi`, many feature APIs.
2. **Public API barrels** — routes/workspaces import from the feature root
   (`@/features/auth`), not deep internals. Deep imports are reserved for:
   - `redux/*` (infrastructure registering reducers / refreshing tokens)
   - `access-control/*` (cross-cutting layer reading auth selectors)
   - the feature's own files
3. **Pages stay thin** — a page imports a feature component and wraps it in
   Suspense; all logic lives in the feature.
4. **Workspace ≠ Feature** — `workspaces/admin` is *how the app looks* for
   admins (sidebar, nav); `features/leads` is *what the app does* (leads).
   The same feature can serve multiple roles (`/admin/jobs`, `/worker/jobs`).
5. **No boilerplate folders** — a feature grows folder-by-folder when needed
   (`api/` first, then `types/`, `components/`…). Don't pre-create empty
   `.gitkeep` trees.
6. **Naming** — components are PascalCase and describe what they render:
   `LoginForm.tsx`, `RegisterForm.tsx`, `ForgotPasswordForm.tsx`.
7. **Types** — `src/types/` only holds genuinely global types; domain types
   (lead, invoice, auth…) live in their feature.

```


## Migration map (what moved where)

| Old                                    | New                                          |
| -------------------------------------- | -------------------------------------------- |
| `sharedComponents/auth/*`              | `features/auth/components/*`                 |
| `sharedComponents/button/Button.tsx`   | `components/ui/Button.tsx`                   |
| `components/LoginFallback.tsx`         | `features/auth/components/LoginFallback.tsx` |
| `components/shared/common/otp-input/`  | `components/shared/otp-input/`               |
| `redux/features/auth/authSlice.ts`     | `features/auth/state/auth.slice.ts`          |
| `redux/features/auth/authapi.ts`       | `features/auth/api/auth.api.ts`              |
| `redux/features/auth/authHelpers.ts`   | `features/auth/utils/auth.utils.ts`          |
| `redux/features/auth/hooks.ts`         | `features/auth/hooks/useAuth.ts`             |
| `redux/features/auth/SessionLoader.tsx`| `features/auth/components/SessionLoader.tsx` |
| `redux/features/ui/uiSlice.ts`         | `features/ui/state/ui.slice.ts`              |
| `types/auth.ts`                        | `features/auth/types/auth.types.ts`          |
| `login.tsx` / `Register.tsx` / `ForgotPassword.tsx` | `LoginForm.tsx` / `RegisterForm.tsx` / `ForgotPasswordForm.tsx` |
| login endpoint inside `baseApi`        | `features/auth/api/auth.api.ts`              |

Empty placeholder features (appointments, contracts, crm, customers,
estimations, notifications, properties, reports, requests, time-tracking,
workers) were removed — recreate a folder only when the feature gets real code.
