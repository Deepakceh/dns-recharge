import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { authService } from "@/api/auth/services";
import { showToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // 🌀 Import spinner icon
import { Eye, EyeOff } from "lucide-react";

interface LoginFormValues {
  userId: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  userId: Yup.string().required("Required user id"),
  password: Yup.string().required("Required password"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (values: LoginFormValues, { resetForm }: { resetForm: () => void }) => {
    setLoading(true);
    try {
      const res = await authService.SignIn("SIGN_IN", values);
      setLoading(false);
      if (res?.success) {
        navigate('/dashboard')
        resetForm();
        showToast.success(res?.message || "Login successful");
      } else {
        showToast.error(res?.message || "Failed to login");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Formik
          initialValues={{ userId: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="relative w-full">
                <Field name="userId" type="text" as={Input} placeholder=" " autoComplete='off' className="peer h-12 w-full border border-gray-300 rounded px-3 pt-5 placeholder-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none" />
                <label htmlFor="userId" className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700">
                  User ID
                </label>
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  <ErrorMessage name="userId" />
                </div>
              </div>

              <div className="relative w-full mt-6">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  autoComplete="off"
                  className="peer h-12 w-full border border-gray-300 rounded px-3 pr-10 pt-5 placeholder-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-1 text-gray-500 text-sm transition-all 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-1 
      peer-focus:text-xs peer-focus:text-gray-700"
                >
                  Password
                </label>

                {/* 👁️ Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>

                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  <ErrorMessage name="password" />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-orange-500" />
                  <span>Remember Me</span>
                </label>
                <Link to="/login/forgot" className="text-blue-600 hover:underline">Forgot Password?</Link>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-3">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm text-gray-500 my-4">OR</div>
              <Link to="/login/otp">
                <Button type="button" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Login With OTP
                </Button>
              </Link>
              <div className="text-center text-sm mt-4 text-gray-600">Don’t have an account?
                <Link to="/login/signup" className="text-orange-500 font-medium hover:underline">Signup</Link>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default Login;
