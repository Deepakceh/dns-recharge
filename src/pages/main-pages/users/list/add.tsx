import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { commonService } from "@/api/common/service";
import { getValidationSchema } from "@/utils/validation";
import * as Yup from "yup";
import { userService } from "@/api/user/services";
import { showToast } from "@/utils/toast";
import CircleLoader from "@/components/common/loader/CircleLoader";

interface FormValues {
  fullName: string;
  email: string;
  mobileNumber: string;
  roleId: string;
  packageId: string;
  userName: string;
  passWord: string;
  isActive: boolean;
  isLocked: boolean;
}
interface OptionType {
  id: number;
  name: string;
}

const validationSchema = Yup.object({
  fullName: getValidationSchema({ isRequired: true, minLength: 2, maxLength: 100 }),
  email: getValidationSchema({ isRequired: true, type: "email", minLength: 5, maxLength: 100 }),
  mobileNumber: getValidationSchema({ isRequired: true, type: "phone", minLength: 10, maxLength: 10 }),
  roleId: getValidationSchema({ isRequired: true }),
  packageId: getValidationSchema({ isRequired: true }),
  userName: getValidationSchema({ isRequired: true }),
  passWord: getValidationSchema({ isRequired: true })
});

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams<{ mode: string; id?: string }>();
  const page = mode?.toUpperCase();

  const [loader, setLoader] = useState(false)
  const [roleData, setRoleData] = useState<OptionType[]>([]);
  const [packageData, setPackageData] = useState<OptionType[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({
    fullName: "",
    email: "",
    mobileNumber: "",
    roleId: "",
    packageId: "",
    userName: "",
    passWord: "",
    isActive: true,
    isLocked: false,
  });

  // Load dropdowns
  useEffect(() => {
    Promise.all([getRoleDropdownService(), getPackageDropdownService()]);
  }, []);

  // Load user data only if EDIT or VIEW mode, and dropdowns are loaded
  useEffect(() => {
    if (page && id && page !== "ADD" && roleData.length > 0 && packageData.length > 0) {
      getUserByIdService(id);
    }
  }, [page, id, roleData, packageData]);

  const getRoleDropdownService = async () => {
    try {
      const res = await commonService.GetRoles();
      if (res?.success) {
        const data = res.data as Array<{ id: number; name: string }>;
        setRoleData(data.map(({ id, name }) => ({ id, name })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPackageDropdownService = async () => {
    try {
      const res = await commonService.PackageDropdown();
      if (res?.success) {
        const data = res.data as Array<{ value: number; text: string }>;
        setPackageData(data.map(({ value, text }) => ({ id: value, name: text })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserByIdService = async (userId: string) => {
    setLoader(true)
    try {
      const res = await userService.GetUserById(userId);
      setLoader(false)
      if (res?.success) {
        const data = res.data as Partial<FormValues>;
        const formData: FormValues = {
          fullName: data.fullName || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          roleId: data.roleId?.toString() || "",
          packageId: data.packageId?.toString() || "",
          userName: data.userName || "",
          passWord: data.passWord || '', // blank on edit for security
          isActive: data.isActive ?? true,
          isLocked: data.isLocked ?? false,
        };
        setInitialValues(formData);

      }
    } catch (err) {
      console.error(err);
      setLoader(false)
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setLoader(true)
    try {
      const res = await userService.AddUpdateUser({ ...values, id: id || undefined });
      setLoader(false)
      if (res?.success) {
        showToast.success(res.message || (page === "EDIT" ? "User updated successfully" : "User added successfully"));
        setTimeout(() => navigate("/users/list"), 2000);
      } else {
        showToast.error(res?.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      setLoader(false)
    }
  };

  // Disable all inputs if in VIEW mode
  const isViewMode = page === "VIEW";

  return (
    <>
      {loader && <CircleLoader />}
      <div className="p-4">
        <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">
            {page === "EDIT" ? "Edit User" : page === "VIEW" ? "View User" : "Add User"}
          </h3>
          <Separator className="my-2 bg-gray-200" />

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form
                className="space-y-6"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              >
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mt-3 mb-3">General Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <InputField name="fullName" label="Name" type="text" placeholder="Enter Your Name" inputMode="alpha" disabled={isViewMode} />
                    <InputField name="email" label="Email Id" type="email" placeholder="Enter your Email id" disabled={isViewMode} />
                    <InputField name="mobileNumber" label="Contact Number" type="text" placeholder="+91 XXX XXXX XXX" inputMode="int" maxLength={10} disabled={isViewMode} />
                    <SelectField name="roleId" label="Role" options={roleData} disabled={isViewMode} />
                    <SelectField name="packageId" label="Package" options={packageData} disabled={isViewMode} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-3">Login Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <InputField name="userName" label="Username" type="text" placeholder="Enter Your Username" disabled={isViewMode} />
                    <InputField name="passWord" label="Password" type="password" placeholder="Enter Your Password" disabled={isViewMode} />
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
                          disabled={isViewMode}
                          className="accent-orange-500"
                        />
                        <label htmlFor="isActive" className="text-sm">
                          Active
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
                          disabled={isViewMode}
                          className="accent-orange-500"
                        />
                        <label htmlFor="isLocked" className="text-sm">
                          Locked
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isViewMode && (
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button type="submit" className="bg-orange-500 text-white w-full sm:w-48 hover:bg-orange-600">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => navigate(-1)}
                      variant="outline"
                      className="w-full sm:w-48 border-blue-900 text-blue-900 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddUser;
