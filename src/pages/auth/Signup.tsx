import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import signupBg from "@/assets/images/dns/signup_bg.svg";
import { getValidationSchema } from "@/utils/validation";
import { motion } from "framer-motion"; // Importing Framer Motion
import { commonService } from "@/api/common/service";

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
  name: getValidationSchema({ isRequired: true, type: "text", minLength: 2, maxLength: 100 }),
  shopName: getValidationSchema({ isRequired: true, type: "text", minLength: 2, maxLength: 100 }),
  mobile: getValidationSchema({ isRequired: true, type: "phone", minLength: 10, maxLength: 10 }),
  email: getValidationSchema({ isRequired: true, type: "email", minLength: 5, maxLength: 100 }),
  state: getValidationSchema({ isRequired: true, type: "text" }),
  district: getValidationSchema({ isRequired: true, type: "text" }),
  address: getValidationSchema({ isRequired: true, type: "text" }),
  pincode: getValidationSchema({ isRequired: true, type: "number", minLength: 6, maxLength: 6 }),
  aadhar: getValidationSchema({ isRequired: false, type: "aadhar", minLength: 12, maxLength: 12 }),
  pan: getValidationSchema({ isRequired: false, type: "pan", minLength: 10, maxLength: 10 }),
  gst: getValidationSchema({ isRequired: false, type: "gst", minLength: 15, maxLength: 15 }),
  companyType: getValidationSchema({ isRequired: true, type: "text" }),
  domainName: getValidationSchema({ isRequired: true, type: "text" }),
  role: getValidationSchema({ isRequired: true, type: "text" }),
});

const Signup: React.FC = () => {
  const [dropdown] = useState({
    state: [
      { value: "", label: "Select" },
      { value: "UP", label: "Uttar Pradesh" },
      { value: "MP", label: "Madhya Pradesh" },
    ],
    district: [
      { value: "", label: "Select" },
      { value: "district1", label: "District 1" },
      { value: "district2", label: "District 2" },
    ],
    companyType: [
      { value: "", label: "Select" },
      { value: "LLP", label: "LLP" },
      { value: "PVT_LTD", label: "Private Limited" },
      { value: "PARTNERSHIP", label: "Partnership" },
    ],
  });
  useEffect(() => {
    // const fetchStates = async () => {
    //   try {
    //     const response = await commonService.common_state();
    //     console.log('get state data', response);
    //   } catch (err) {
    //     console.error("State API Error:", err);
    //   } finally {
    //     // setLoading(false);
    //   }
    // };

    const fetchDstrict = async () => {
      try {
        const response = await commonService.common_district('COMMON_DISTRICT', { id: "33" });
        console.log('get state data', response);
      } catch (err) {
        console.error("District API Error:", err);
      } finally {
        // setLoading(false);
      }
    };
    // fetchStates();
    fetchDstrict()
  }, []);


  const handleSubmit = (values: SignupFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("Form Data:", values);
    resetForm();
    alert("Signup Successful");
  };

  return (
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
              role: "RETAILER",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="flex justify-center mb-6 gap-8">
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="role" value="RETAILER" onChange={() => setFieldValue("role", "RETAILER")} />
                    Retailer
                  </label>
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="role" value="API_USER" onChange={() => setFieldValue("role", "API_USER")} />
                    API User
                  </label>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <InputField name="name" label="Name" type="text" placeholder="Enter Name" labelType='floating' className="border" />
                  <InputField name="shopName" label="Shop Name" type="text" placeholder="Enter Shop Name" labelType='floating' className="border" />
                  <InputField name="mobile" label="Mobile" type="text" maxLength={10} placeholder="Enter Mobile" labelType='floating' className="border" />
                  <InputField name="email" label="Email" type="email" placeholder="Enter Email" labelType='floating' className="border" />
                  <SelectField name="state" label="State" options={dropdown.state} labelType='floating' className="border" />
                  <SelectField name="district" label="District" options={dropdown.district} labelType='floating' className="border" />
                  <InputField name="address" label="Address" type="text" placeholder="Enter Address" labelType='floating' className="border" />
                  <InputField name="pincode" label="Pincode" type="text" maxLength={6} placeholder="Enter Pincode" labelType='floating' className="border" />
                  <InputField name="aadhar" label="Aadhar" type="text" maxLength={12} capitalize={true} placeholder="Enter Aadhar Number" labelType='floating' className="border" />
                  <InputField name="pan" label="PAN" type="text" maxLength={10} capitalize={true} placeholder="Enter PAN Number" labelType='floating' className="border" />

                  {/* Conditional fields for API_USER role */}
                  {values.role === "API_USER" && (
                    <                    >
                      <InputField name="gst" label="GST" type="text" maxLength={15} capitalize={true} placeholder="Enter GST Number" labelType='floating' className="border" />
                      <InputField name="domainName" label="Domain Name" type="text" placeholder="Enter Domain Name" labelType='floating' className="border" />
                      <SelectField name="companyType" label="Company Type" options={dropdown.companyType} labelType='floating' className="border" />
                    </>
                  )}
                </div>

                <div className="flex gap-4 mt-10">
                  <Button type="submit" className="w-full bg-orange-500 text-white hover:brightness-90">Submit</Button>
                  <Button type="button" variant="outline" className="w-full border border-blue-900 text-blue-900 hover:bg-blue-50">Cancel</Button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
