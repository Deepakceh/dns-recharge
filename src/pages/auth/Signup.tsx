import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { getValidationSchema } from "@/utils/validation";
import { motion } from "framer-motion";
import { commonService } from "@/api/common/service";
import { authService } from "@/api/auth/services";
import { OtpModal } from "@/components/common/OtpModal";
import { showToast } from "@/utils/toast";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { Link } from "react-router-dom";

interface SignupFormValues {
  name: string;
  shopName: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  address: string;
  pincode: string;
  aadhar: string;
  pan: string;
  gst: string;
  companyType: string;
  domainName: string;
  role: string;
}

const validationSchema = Yup.object({
  name: getValidationSchema({ isRequired: true, type: "text", minLength: 3, maxLength: 100 }),
  shopName: getValidationSchema({ isRequired: true, type: "text", minLength: 3, maxLength: 100 }),
  mobile: getValidationSchema({ isRequired: true, type: "phone", minLength: 10, maxLength: 10 }),
  email: getValidationSchema({ isRequired: true, type: "email", minLength: 5, maxLength: 100 }),
  state: getValidationSchema({ isRequired: true, type: "text" }),
  district: getValidationSchema({ isRequired: true, type: "text" }),
  address: getValidationSchema({ isRequired: true, type: "text" }),
  pincode: getValidationSchema({ isRequired: true, type: "number", minLength: 6, maxLength: 6 }),
  aadhar: getValidationSchema({ isRequired: true, type: "aadhar", minLength: 12, maxLength: 12 }),
  pan: getValidationSchema({ isRequired: true, type: "pan", minLength: 10, maxLength: 10 }),

  // ✅ Conditionally required for API users only
  gst: Yup.string().when('role', (role, schema) => {
    return String(role) === '2'
      ? getValidationSchema({ isRequired: true, type: 'gst', minLength: 15, maxLength: 15 })
      : schema.notRequired();
  }),

  domainName: Yup.string().when('role', (role, schema) => {
    return String(role) === '2'
      ? getValidationSchema({ isRequired: true, type: 'gst', minLength: 15, maxLength: 15 })
      : schema.notRequired();
  }),

  companyType: Yup.string().when('role', (role, schema) => {
    return String(role) === '2'
      ? getValidationSchema({ isRequired: true, type: 'gst', minLength: 15, maxLength: 15 })
      : schema.notRequired();
  }),
  role: getValidationSchema({ isRequired: true, type: "text" }),
});


const Signup: React.FC = () => {
  interface OptionType { id: number; name: string; }
  const [loader, setLoader] = useState(false)
  const [formValues, setFormValues] = useState<SignupFormValues | null>(null);

  const [stateData, setStateData] = useState<OptionType[]>([]);
  const [districtData, setDistrictData] = useState<OptionType[]>([]);
  const [companyTypeData, setCompanyTypeData] = useState<OptionType[]>([]);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  useEffect(() => {
    getStateService();
    getCompanyService()
  }, []);

  //  api call for get states data
  const getStateService = async () => {
    try {
      const res = await commonService.StateList();
      if (res?.success) {
        const data = res.data as Array<{ id: number; stateName: string }>;
        const states = data.map((state) => ({ id: state.id, name: state.stateName }));
        setStateData(states);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle state change to fetch districts
  const handleStateChange = async (stateId: string, setFieldValue: (field: string, value: string) => void) => {
    setFieldValue("district", "");
    setDistrictData([]);
    if (!stateId) return;
    try {
      const res = await commonService.DistrictList(stateId);
      const data = res.data as Array<{ id: number; districtName: string }>;
      const districts = data.map((district) => ({ id: district.id, name: district.districtName }));
      setDistrictData(districts);
    } catch (err) {
      console.error(err);
    }
  };

  //  api call for get company data 
  const getCompanyService = async () => {
    try {
      const res = await commonService.CompanyType();
      if (res?.success) {
        const data = res.data as Array<{ id: number; typeName: string }>;
        const companies = data.map((company) => ({ id: company.id, name: company.typeName }));
        setCompanyTypeData(companies);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSubmit = async (values: SignupFormValues, { resetForm }: { resetForm: () => void }) => {
  const handleSubmit = async (values: SignupFormValues) => {
    setLoader(true);
    setFormValues(values);
    try {
      const res = await authService.SendSignUpOTP(values.mobile, values.email);
      setLoader(false);
      if (res?.success) {
        setShowOtp(true);
        showToast.success(res?.message || "OTP sent successfully");
      } else {
        showToast.error(res?.message || "Failed to send OTP");
      }
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };

  // Handle OTP submission with signup data
  const handleOtpSubmit = async (otp: string) => {
    setLoader(true)
    try {
      if (!formValues) return;
      const res = await authService.SignUp({ ...formValues, otp });
      setLoader(false)
      if (res?.success) {
        setShowOtp(false);
        showToast.success(res?.message || "Signup successful");
        setFormValues(null); // Clear formValues state as well
      } else {
        showToast.error(res?.message || "");
      }
    } catch (err) {
      setLoader(false)
      console.error(err);
    }
  };

  return (
    <>
      {loader && <CircleLoader />}
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${signupBg})` }}>
        <div className="flex justify-center items-center py-12 px-4">
          {/* Wrapping the form with Framer Motion for fade-in effect */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-6 w-full max-w-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Create your Account</h2>
            <Formik
              initialValues={{
                name: "",
                shopName: "",
                mobile: "",
                email: "",
                state: "",
                district: "",
                address: "",
                pincode: "",
                aadhar: "",
                pan: "",
                gst: "",
                companyType: "",
                domainName: "",
                role: "4",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}

            >
              {({ values, setFieldValue }) => (
                <Form onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}>
                  <div className="flex justify-center mb-6 gap-8">
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="role" value="4" onChange={() => {
                        setFieldValue("role", "4");
                        setFieldValue("gst", "");
                        setFieldValue("domainName", "");
                        setFieldValue("companyType", "");
                      }} />
                      Retailer
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="role" value="2" onChange={() => setFieldValue("role", "2")} />
                      API User
                    </label>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <InputField name="name" label="Name" type="text" placeholder="Enter Name" labelType='floating' inputMode='alpha' className="border" />
                    <InputField name="shopName" label="Shop Name" type="text" placeholder="Enter Shop Name" labelType='floating' inputMode='alpha' className="border" />
                    <InputField name="mobile" label="Mobile" type="text" maxLength={10} placeholder="Enter Mobile" labelType='floating' inputMode='int' className="border" />
                    <InputField name="email" label="Email" type="email" placeholder="Enter Email" labelType='floating' className="border" />
                    <SelectField name="state" label="State" options={stateData} labelType='floating' className="border" onCustomChange={(stateId: string) => handleStateChange(stateId, setFieldValue)} />
                    <SelectField name="district" label="District" options={districtData} labelType='floating' className="border" />
                    <InputField name="address" label="Address" type="text" placeholder="Enter Address" labelType='floating' className="border" />
                    <InputField name="pincode" label="Pincode" type="text" maxLength={6} placeholder="Enter Pincode" labelType='floating' inputMode='int' className="border" />
                    <InputField name="aadhar" label="Aadhar" type="text" maxLength={12} capitalize={true} placeholder="Enter Aadhar Number" labelType='floating' inputMode='int' className="border"
                      showVerificationIcon={true}
                      verifiedStatus={true}
                      onVerificationIconClick={() => {
                        alert("Verification icon clicked");
                      }} />
                    <InputField name="pan" label="PAN" type="text" maxLength={10} capitalize={true} placeholder="Enter PAN Number" labelType='floating' inputMode='alphanum' className="border"
                      showVerificationIcon={true}
                      verifiedStatus={false}
                      onVerificationIconClick={() => {
                        alert("Verification icon clicked");
                      }} />

                    {/* Conditional fields for API_USER role */}
                    {values.role === "2" && (
                      <>
                        <InputField name="gst" label="GST" type="text" maxLength={15} capitalize={true} placeholder="Enter GST Number" labelType='floating' inputMode='alphanum' className="border"
                          showVerificationIcon={true}
                          verifiedStatus={false}
                          onVerificationIconClick={() => {
                            alert("Verification icon clicked");
                          }} />
                        <InputField name="domainName" label="Domain Name" type="text" placeholder="Enter Domain Name" labelType='floating' className="border" />
                        <SelectField name="companyType" label="Company Type" options={companyTypeData} labelType='floating' className="border" />
                      </>
                    )}
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Button type="submit" className="w-full bg-orange-500 text-white hover:brightness-90" disabled={loader}>Submit</Button>
                    <Link to="/login" className="w-full"><Button type="button" variant="outline" className="w-full border border-blue-900 text-blue-900 hover:bg-blue-50">Cancel</Button></Link>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
        <OtpModal
          open={showOtp}
          onClose={() => setShowOtp(false)}
          onSubmit={handleOtpSubmit}
          onResend={() => {
            if (formValues) handleSubmit(formValues);
          }}
          phoneOrEmail={formValues?.mobile || ""}
        />
      </div>
    </>
  );
};

export default Signup;


