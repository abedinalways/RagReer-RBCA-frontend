# RagReer RBCA

Role-based construction & home-services platform with **three workspaces**
(Admin / Customer / Worker) sharing **one business domain layer**.

> Scaffolded with `npx create-next-app@latest`. Workspaces, features and the
> permission system are wired so the app runs out of the box.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Visit `/login` to switch between Admin / Customer / Worker preview sessions.
Default mock role comes from `NEXT_PUBLIC_MOCK_ROLE` (default `ADMIN`).

## Architecture — 4 boundaries

```
                         FRONTEND
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
       ADMIN             CUSTOMER           WORKER
          │                 │                 │
   Desktop + Mobile       Desktop          Mobile PWA
          │                 │                 │
          ▼                 ▼                 ▼
     Admin Portal      Customer Portal     Worker App
```

| Layer            | Path                 | Responsibility                                |
| ---------------- | -------------------- | --------------------------------------------- |
| ① App routing    | `src/app/`           | URL structure, route groups, layouts, pages   |
| ② Business domain| `src/features/`      | domain logic, hooks, API, schemas, types, UI  |
| ③ Workspace UX   | `src/workspaces/`    | per-role shells, navigation, presentation     |
| ④ Access control | `src/access-control/`| permissions, roles, guards, hooks (single source of truth) |

### Folder map

```text
src/
├── app/
│   ├── (auth)/login/
│   └── (protected)/
│       ├── admin/       dashboard, crm, leads, customers, workers, requests, jobs, reports, settings
│       ├── customer/    requests, property, estimations, contracts, appointments, invoices
│       └── worker/      home, jobs, time, profile
├── features/            auth, crm, leads*, customers, workers, requests, properties,
│                        estimations, contracts, appointments, invoices*, jobs*, time-tracking,
│                        reports, notifications        (* = has demo implementation)
├── workspaces/
│   ├── admin/           layouts (desktop + mobile), navigation, components
│   ├── customer/        layout, navigation, components
│   └── worker/          mobile PWA layout, bottom-nav, components
├── access-control/
│   ├── permissions/     permissions.ts, permission-groups.ts
│   ├── roles/           roles.ts (fixed roles + role↔permission matrix)
│   ├── guards/          PermissionGuard, RoleGuard
│   ├── hooks/           usePermission, useRole
│   └── access.utils.ts
├── components/          ui/ (future shadcn/ui), shared/
├── store/               zustand slices (auth, ui), api/api-client.ts
├── providers/           AppProviders
├── config/  lib/  hooks/  types/  utils/
```

## Permission model (Rules ①–⑤)

1. **Roles fixed** — `ADMIN | CUSTOMER | WORKER` only.
2. **Granular permissions** — `module.action` e.g. `lead.create`, `invoice.pay`.
3. **Centralized definitions** — all strings live in `PERMISSIONS`; never
   scatter hard-coded strings across the app.
4. **UI is permission-driven** — `can(PERMISSIONS.LEAD.DELETE)` /
   `<PermissionGuard permission={PERMISSIONS.LEAD.DELETE}>` control nav items,
   buttons and routes.
5. **Feature ≠ Role** — `features/leads` is shared by Admin (CRM leads table);
   `features/invoices` is shared by Customer "My Invoices" and future Admin
   invoice management; `features/jobs` powers both the Admin jobs list and the
   Worker PWA. Only the workspace presentation differs.

Example permission definition → navigation pipeline:

```text
Permission Definition (access-control/permissions)
        ↓
Role Permission Matrix (access-control/roles)
        ↓
Navigation (workspaces/*/navigation)
        ↓
Route Access (RoleGuard in app/(protected)/*)
        ↓
Component Access (PermissionGuard)
        ↓
Action Access (LeadActions etc.)
```

## Notable files (start here)

- `src/access-control/permissions/permissions.ts` — the entire permission catalog
- `src/access-control/roles/roles.ts` — role → permission matrix + role home
- `src/features/leads/` — reference module showing the full feature anatomy
- `src/workspaces/worker/` — mobile-first PWA shell reusing `features/jobs`
- `src/store/slices/auth-slice.ts` — mock session; swap for a real auth provider