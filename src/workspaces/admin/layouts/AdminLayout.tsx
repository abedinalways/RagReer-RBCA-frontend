
import { AdminDesktopLayout } from "./AdminDesktopLayout";
import { AdminMobileLayout } from "./AdminMobileLayout";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminDesktopLayout>{children}</AdminDesktopLayout>
      <AdminMobileLayout>{children}</AdminMobileLayout>
    </>
  );
}