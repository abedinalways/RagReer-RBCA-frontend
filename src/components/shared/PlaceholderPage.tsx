import type { ReactNode } from "react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Shared presentation shell for routes that are scaffolded but not yet wired
 * to a feature module. Keeps attention on the architecture, not the copy.
 */
export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p> : null}
      </div>

      {children ?? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
          Scaffolded route — wire this page to the matching{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">features/…</code> module.
        </div>
      )}
    </div>
  );
}