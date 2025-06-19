import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// users routes
const UsersLayout = React.lazy(() => import('@/pages/main-pages/users/layout'));
const UserList = React.lazy(() => import('@/pages/main-pages/users/list/list'));
const AddUser = React.lazy(() => import('@/pages/main-pages/users/list/add'));
const Role = React.lazy(() => import('@/pages/main-pages/users/role-permission/role'));
const Permission = React.lazy(() => import('@/pages/main-pages/users/role-permission/permission'));
const Wallet = React.lazy(() => import('@/pages/main-pages/users/wallet/wallet'));

// bank routes
const BankLayout = React.lazy(() => import('@/pages/main-pages/bank/layout'));
const AccountList = React.lazy(() => import('@/pages/main-pages/bank/account/list'));
const AddAccount = React.lazy(() => import('@/pages/main-pages/bank/account/add'));

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
                    </Route>

                    {/* users routes */}
                    <Route path="/users" element={<UsersLayout />}>
                        <Route index element={<Navigate to="list" />} />
                        <Route path="list" element={<UserList />} />
                        <Route path="list/:page" element={<AddUser />} />
                        <Route path="role" element={<Role />} />
                        <Route path="role/permission" element={<Permission />} />
                        <Route path="wallet" element={<Wallet />} />
                    </Route>

                    {/* bank routes */}
                    <Route path="/bank" element={<BankLayout />}>
                        <Route index element={<Navigate to="account-list" />} />
                        <Route path="account-list" element={<AccountList />} />
                        <Route path="account-list/:page" element={<AddAccount />} />
                    </Route>


                    {/* 404 */}
                    <Route path="*" element={<PageNotFound />} />

                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
