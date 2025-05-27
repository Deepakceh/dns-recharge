import React from "react";
import { Outlet } from "react-router-dom";
import GuestNavbar from "@/components/common/GuestNavbar";

const GuestLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <GuestNavbar />
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default GuestLayout;
