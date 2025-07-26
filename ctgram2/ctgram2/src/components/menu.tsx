import { AppSidebar } from "./ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function Menu({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4 flex flex-col gap-1 w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}