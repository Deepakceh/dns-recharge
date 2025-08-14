import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { showToast } from "@/utils/toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import InputField from "@/components/common/formFields/InputField";
import { authService } from "@/api/auth/services";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormValues {
    mobile: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

const getValidationSchema = (showFields: boolean) =>
    Yup.object().shape({
        mobile: Yup.string()
            .required("Mobile is required")
            .matches(/^\d{10}$/, "Enter valid 10-digit mobile"),

        ...(showFields && {
            otp: Yup.string().required("OTP is required"),

            newPassword: Yup.string()
                .required("New password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    "Must include letter, number, and special character"
                ),

            confirmPassword: Yup.string()
                .required("Confirm password is required")
                .oneOf([Yup.ref("newPassword")], "Passwords must match"),
        }),
    });



const Forgot: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        if (showFields && resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer, showFields]);

    const handleSubmit = async (values: ForgotPasswordFormValues) => {
        setLoading(true);
        try {
            if (!showFields) {
                const res = await authService.SendOTP(values.mobile);
                if (res?.success) {
                    showToast.success(res?.message || "OTP sent successfully");
                    setShowFields(true);
                    setResendTimer(60);
                } else {
                    showToast.error(res?.message || "Failed to send OTP");
                }
            } else {
                const res = await authService.SignIn("SIGN_IN_FORGOT", values);
                if (res?.success) {
                    showToast.success(res?.message || "Password reset successfully");
                    navigate('/dashboard')
                } else {
                    showToast.error(res?.message || "Failed to reset password");
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async (mobile: string) => {
        if (resendTimer > 0) return;
        try {
            const res = await authService.SendOTP(mobile);
            if (res?.success) {
                showToast.success(res?.message || "OTP resent");
                setResendTimer(60);
            } else {
                showToast.error(res?.message || "Failed to resend OTP");
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: `url(${signupBg})` }}>
            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
                <Formik
                    initialValues={{
                        mobile: "",
                        otp: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={getValidationSchema(showFields)}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <InputField
                                name="mobile"
                                label="Mobile"
                                type="text"
                                maxLength={10}
                                placeholder="Enter Mobile"
                                labelType="floating"
                                inputMode="int"
                                className="border"
                                disabled={showFields}
                            />

                            {showFields && (
                                <>
                                    <div className="relative">
                                        <InputField
                                            name="otp"
                                            label="OTP"
                                            type="text"
                                            maxLength={6}
                                            placeholder="Enter OTP"
                                            labelType="floating"
                                            inputMode="int"
                                            className="border mt-6"
                                        />
                                        {/* 🕒 Resend timer */}
                                        <div className="text-right text-xs mt-1 text-gray-500">
                                            {resendTimer > 0 ? (
                                                <span>Resend OTP in {resendTimer}s</span>
                                            ) : (
                                                <button type="button" onClick={() => handleResend(values.mobile)} className="text-blue-600 hover:underline">
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative mt-6">
                                        <InputField
                                            name="newPassword"
                                            label="New Password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            labelType="floating"
                                            className="pr-10 border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <div className="relative mt-6">
                                        <InputField
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-enter new password"
                                            labelType="floating"
                                            className="pr-10 border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </>
                            )}

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Submitting..." : showFields ? "Submit" : "Send OTP"}
                            </Button>

                            <div className="text-center text-sm mt-4 text-gray-600">
                                Back to{" "}
                                <Link to="/login" className="text-orange-500 font-medium hover:underline">
                                    Login
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
};

export default Forgot;
