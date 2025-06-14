import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface LoginFormValues {
    mobile: string;
}

const LoginSchema = Yup.object().shape({
    mobile: Yup.string().required("Required mobile"),
});

const LoginWithOtp: React.FC = () => {
    const navigate = useNavigate()
    const handleSubmit = (values: LoginFormValues, { resetForm }: { resetForm: () => void }) => {
        console.log("Form Data:", values);
        resetForm();
        navigate('/login/otp/verify')
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: `url(${signupBg})` }}>
            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-center mb-20 text-gray-800">Login With OTP</h2>
                <Formik
                    initialValues={{ mobile: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="relative w-full">
                                <Field name="mobile" type="text" as={Input}  placeholder=" " maxLength='10' autoComplete='off' className="peer h-12 w-full border border-gray-300 rounded px-3 pt-5 placeholder-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none" />
                                <label htmlFor="mobile" className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700">
                                    Mobile
                                </label>
                                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                                    <ErrorMessage name="mobile" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6">Send</Button>
                            <Button type="button" className="w-full bg-blue-900 hover:bg-blue-800 text-white mt-6">
                                <Link to="/login">Cancel</Link>
                            </Button>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
};

export default LoginWithOtp;
