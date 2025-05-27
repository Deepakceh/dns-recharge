import React from "react";
import { Outlet } from "react-router-dom";  // Import Outlet for nested routes
import AuthNavbar from "../common/AuthNavbar";

const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AuthNavbar />
      <main>
        {/*Render children or Outlet */}
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AuthLayout;
