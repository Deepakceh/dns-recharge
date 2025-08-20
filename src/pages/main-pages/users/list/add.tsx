import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { commonService } from "@/api/common/service";
import { getValidationSchema } from "@/utils/validation";
import * as Yup from "yup";
import { userService } from "@/api/user/services";
import { useLocation } from 'react-router-dom';
import { showToast } from "@/utils/toast";

interface formValues {
  fullName: string;
  email: string;
  mobileNumber: string;
  roleId: string;
  packageId: string;
  userName: string;
  password: string;
  isActive: boolean;
  isLocked: boolean;
}
interface OptionType { id: number; name: string; }

const validationSchema = Yup.object({
  fullName: getValidationSchema({ isRequired: true, minLength: 2, maxLength: 100 }),
  email: getValidationSchema({ isRequired: true, type: "email", minLength: 5, maxLength: 100 }),
  mobileNumber: getValidationSchema({ isRequired: true, type: "phone", minLength: 10, maxLength: 10 }),
  roleId: getValidationSchema({ isRequired: true }),
  packageId: getValidationSchema({ isRequired: true }),
  userName: getValidationSchema({ isRequired: true }),
  password: getValidationSchema({ isRequired: true })
});

const AddUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const id = location.state?.userId || 0;

  const [roleData, setRoleData] = useState<OptionType[]>([]);
  const [packageData, setPackageData] = useState<OptionType[]>([]);


  useEffect(() => {
    getRoleDropdwonService()
    getPackageDropdwonService()
  }, []);

  //  api call for get role dropdown data
  const getRoleDropdwonService = async () => {
    try {
      const res = await commonService.GetRoles();
      if (res?.success) {
        const data = res.data as Array<{ id: number; name: string }>;
        const role = data.map((role) => ({ id: role.id, name: role.name }));
        setRoleData(role);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  api call for get role dropdown data
  const getPackageDropdwonService = async () => {
    try {
      const res = await commonService.PackageDropdown();
      if (res?.success) {
        const data = res.data as Array<{ value: number; text: string }>;
        const role = data.map((role) => ({ id: role.value, name: role.text }));
        setPackageData(role);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values: formValues) => {
    // console.log('get data', { ...values, id })
    try {
      const res = await userService.AddUpdateUser({ ...values, id });
      if (res?.success) {
        showToast.success(res?.message || "User added successful");
        setTimeout(() => {
          navigate('/users/list');
        }, 2000);
      } else {
        showToast.error(res?.message || "Faild");
      }
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="p-4">
      <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Add User</h3>
        <Separator className="my-2 bg-gray-200" />

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            mobileNumber: "",
            roleId: "",
            packageId: "",
            userName: "",
            password: "",
            isActive: true,
            isLocked: false
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6" onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}>
              <div>
                <h4 className="text-base font-semibold text-gray-700 mt-3 mb-3">General Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <InputField name="fullName" label="Name" type="text" placeholder="Enter Your Name" inputMode='alpha' />
                  <InputField name="email" label="Email Id" type="email" placeholder="Enter your Email id" />
                  <InputField name="mobileNumber" label="Contact Number" type="text" placeholder="+91 XXX XXXX XXX" inputMode='int' maxLength={10} />
                  <SelectField name="roleId" label="Role Id" options={roleData} />
                  <SelectField name="packageId" label="Package Id" options={packageData} />
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-700 mb-3">Login Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <InputField name="userName" label="Username" type="text" placeholder="Enter Your Username" />
                  <InputField name="password" label="Password" type="password" placeholder="Enter Your Password" />
                  <div className="flex flex-wrap gap-6 mt-2">
                    {/* IsActive */}
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="isActive"
                        name="status"
                        checked={values.isActive === true}
                        onChange={() => {
                          setFieldValue("isActive", true);
                          setFieldValue("isLocked", false);
                        }}
                        className="accent-orange-500"
                      />
                      <label htmlFor="isActive" className="text-sm">
                        IsActive
                      </label>
                    </div>

                    {/* IsLocked */}
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="isLocked"
                        name="status"
                        checked={values.isLocked === true}
                        onChange={() => {
                          setFieldValue("isLocked", true);
                          setFieldValue("isActive", false);
                        }}
                        className="accent-orange-500"
                      />
                      <label htmlFor="isLocked" className="text-sm">
                        IsLocked
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button type="submit" className="bg-orange-500 text-white w-full sm:w-48 hover:bg-orange-600">
                  Submit
                </Button>
                <Button
                  type="button" onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full sm:w-48 border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default AddUser;


