import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import CircleLoader from "@/components/common/loader/CircleLoader";

// Layouts
const GuestLayout = React.lazy(() => import('@/components/layout/GuestLayout'));
const AuthLayout = React.lazy(() => import('@/components/layout/AuthLayout'));

// Guest Pages
const Home = React.lazy(() => import('@/pages/guestPages/Home'));
const About = React.lazy(() => import('@/pages/guestPages/About'));
const ContactUs = React.lazy(() => import('@/pages/guestPages/Contact'))
const Login = React.lazy(() => import('@/pages/auth/Login'));
const LoginWithOtp = React.lazy(() => import('@/pages/auth/LoginWithOtp'));
const OtpVerify = React.lazy(() => import('@/pages/auth/OtpVerify'));
const Signup = React.lazy(() => import('@/pages/auth/Signup'));

// Auth Pages
const Dashboard = React.lazy(() => import('@/pages/main-pages/Dashboard'));
const User = React.lazy(() => import('@/pages/main-pages/users/UserList/User'));

// Other
const PageNotFound = React.lazy(() => import('@/pages/otherPages/PageNotFound'));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<CircleLoader />}>
                <Toaster position="top-right" richColors closeButton />
                <Routes>

                    {/* Guest Routes */}
                    <Route element={<GuestLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/login/otp" element={<LoginWithOtp />} />
                        <Route path="/login/otp/verify" element={<OtpVerify />} />
                        <Route path="/login/signup" element={<Signup />} />
                    </Route>

                    {/* Authenticated Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users/:page" element={<User />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<PageNotFound />} />

                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
