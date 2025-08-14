import React from "react";
import { Outlet } from "react-router-dom";  // Import Outlet for nested routes
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import AuthNavbar from "../common/AuthNavbar";
const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AuthNavbar />
        {children || <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthLayout;
