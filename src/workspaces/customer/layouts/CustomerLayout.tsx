
import { CustomerHeader } from "../components/CustomerHeader";
import { CustomerSidebar } from "../components/CustomerSidebar";

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <div className="hidden w-64 shrink-0 border-r border-slate-200 bg-layout-bg md:block">
        <CustomerSidebar />
      </div>
      <div className="min-w-0 flex-1">
        <CustomerHeader />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}