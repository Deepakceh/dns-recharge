import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AuthNavbar from "@/components/common/AuthNavbar";
export default function UsersLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AuthNavbar />
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}
