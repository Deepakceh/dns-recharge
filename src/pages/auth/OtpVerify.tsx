import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"; // shadcn
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { authService } from "@/api/auth/services";
import { showToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface OtpFormValues {
    otp: string;
}

const OtpSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .length(6, "OTP must be 6 digits"),
});

const OtpVerify: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const mobile = location.state?.mobile;
    const [timer, setTimer] = useState(60);
    const [resendActive, setResendActive] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setResendActive(true);
        }
    }, [timer]);

    const handleSubmit = async (values: OtpFormValues) => {
        try {
            const res = await authService.SignIn("SIGN_IN_OTP", { ...values, mobile });
            if (res?.success) {
                Cookies.set("token", res?.token || "");
                Cookies.set("userData", JSON.stringify(res?.data));
                navigate('/dashboard')
                showToast.success(res?.message || "Login successful");
            } else {
                showToast.error(res?.message || "Failed to login");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleResend = async () => {
        try {
            const res = await authService.SendOTP(mobile);
            setTimer(60);
            setResendActive(false);
            if (res?.success) {
                showToast.success(res?.message || "OTP sent successfully");
            } else {
                showToast.error(res?.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${signupBg})` }}>
            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Verify OTP</h2>
                <p className="text-center text-gray-600 mb-6"> Confirm the security code sent to your mobile {mobile}.</p>

                <Formik initialValues={{ otp: "" }} validationSchema={OtpSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={6}
                                    value={values.otp}
                                    onChange={(value) => {
                                        const numericOnly = value.replace(/\D/g, ""); // remove non-digits
                                        setFieldValue("otp", numericOnly);
                                    }}                                >
                                    <InputOTPGroup>
                                        {[...Array(6)].map((_, i) => (
                                            <InputOTPSlot key={i} index={i} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <div className="text-center text-xs text-red-500 -mt-4">
                                <ErrorMessage name="otp" />
                            </div>
                            <div className="text-center text-sm mt-2">
                                {!resendActive && <span className="font-semibold text-blue-800">00:{timer.toString().padStart(2, "0")}</span>}
                                {resendActive ? (
                                    <button type="button" className="ml-4 text-orange-500 hover:underline text-sm font-medium" onClick={handleResend}>
                                        Send Again?
                                    </button>
                                ) : (
                                    <span className="ml-4 text-gray-400">Send Again?</span>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                Confirm
                            </Button>

                            <Link to="/login/otp">
                                <Button type="button" className="w-full bg-blue-900 hover:bg-blue-800 text-white mt-6">
                                    Back
                                </Button>
                            </Link>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
};

export default OtpVerify;
