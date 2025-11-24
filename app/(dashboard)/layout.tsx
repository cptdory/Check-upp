import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "@/components/ui/sonner"; 
// ↑ Make sure the import path is correct (where you placed the file)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <SiteHeader />

        {children}

        {/* ✅ Sonner Toaster */}
        <Toaster closeButton richColors expand />
      </SidebarInset>
    </SidebarProvider>
  );
}
