import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { constants, getUserAllData } from "@/constants";

interface ProtectedProps {
    allowedRoles?: string[];
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ allowedRoles = [], children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Token & User Data Check
    const token = Cookies.get("token");
    const userData = getUserAllData();

    // Without login → Navigate(-1)
    if (!token || !userData) {
        console.warn("No token or user data. Navigating back.");
        navigate(-1);
        return null;
    }

    // Platform Validation
    const isValidPlatform = constants.platform === import.meta.env.VITE_REACT_APP_PLATFORM;

    // Platform mismatch → Logout & Navigate(-1)
    if (token && !isValidPlatform) {
        console.warn("Platform mismatch. Logging out...");
        Cookies.remove("user_data");
        Cookies.remove("token");
        navigate(-1);
        return null;
    }

    // Already Logged-in Users → Prevent access to login page
    if (
        (location.pathname === "/" || location.pathname === "/vendor") &&
        token &&
        userData
    ) {
        console.warn("Already logged in. Navigating back.");
        navigate(-1);
        // return null;
    }

    // Determine User Role
    const userRole = userData?.IsVendor === "1" ? "Vendor" : "Admin";

    // Role-based validation
    const canAccess = allowedRoles.includes(userRole) || allowedRoles.includes("Both");

    if (!canAccess) {
        console.warn(`Unauthorized access: ${userRole}. Navigating back.`);
        navigate(-1);
        return null;
    }

    // Render the component if everything is valid
    return <>{children}</>;
};

export default ProtectedRoute;
