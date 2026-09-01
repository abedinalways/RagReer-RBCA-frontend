"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import { ROLES, ROLE_HOME, type Role } from "@/access-control/roles/roles";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS: Array<{ role: Role; label: string; icon: string; description: string }> = [
  {
    role: ROLES.ADMIN,
    label: "Admin",
    icon: "🏢",
    description: "Dashboard, CRM, Leads, Customers, Workers, Jobs, Reports & Settings.",
  },
  {
    role: ROLES.CUSTOMER,
    label: "Customer",
    icon: "🏠",
    description: "My Requests, Property, Estimations, Contracts, Appointments & Invoices.",
  },
  {
    role: ROLES.WORKER,
    label: "Worker",
    icon: "🔧",
    description: "Home, Jobs, Time-tracking & Profile on the mobile PWA.",
  },
];

/** Mock sign-in — pick a role to preview its workspace shell & permission scope. */
export default function LoginPage() {
  const login = useAppStore((state) => state.login);
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);

  const handleSelect = (role: Role) => {
    setSelected(role);
    login(role);
    router.replace(ROLE_HOME[role]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">RagReer RBCA</h1>
          <p className="mt-1 text-sm text-slate-500">Choose a workspace to preview its portal.</p>
        </div>

        <div className="mt-6 space-y-3">
          {ROLE_OPTIONS.map((option) => (
            <button
              key={option.role}
              type="button"
              onClick={() => handleSelect(option.role)}
              disabled={selected !== null}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                selected === option.role
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {option.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{option.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{option.description}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Mock sign-in — swap <code className="rounded bg-slate-100 px-1 py-0.5">login()</code> for a real auth provider.
        </p>
      </div>
    </div>
  );
}