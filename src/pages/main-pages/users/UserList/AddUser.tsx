import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
interface userFormValues {
  name: string;
  email: string;
  mobile: string;
  role: string;
  package: string;
  userName: string;
  password: string;
}

export default function AddUser() {
  const navigate = useNavigate()
  const [dropdown] = useState({
    package: [
      { value: "", label: "Select" },
      { value: "package1", label: "Package 1" },
      { value: "package2", label: "Package 2" },
    ],
    role: [
      { value: "", label: "Select" },
      { value: "role1", label: "Role 1" },
      { value: "role2", label: "Role 2" },
    ],
  });

  const handleSubmit = (
    values: userFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("filter Data:", values);
    resetForm();
  };

  return (
    <div className="p-4">
      <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Add User</h3>
        <Separator className="my-2 bg-gray-200" />

        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile: "",
            role: "",
            package: "",
            userName: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {/* General Info Section */}
              <div>
                <h4 className="text-base font-semibold text-gray-700 mt-3 mb-3">General Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <InputField name="name" label="Name" type="text" placeholder="Enter Your Name" />
                  <InputField name="email" label="Email Id" type="email" placeholder="Enter your Email id" />
                  <InputField name="mobile" label="Contact Number" type="text" placeholder="+91 XXX XXXX XXX" />
                  <SelectField name="role" label="Role Id" options={dropdown.role} />
                  <SelectField name="package" label="Package Id" options={dropdown.package} />
                </div>
              </div>

              {/* Login Info Section */}
              <div>
                <h4 className="text-base font-semibold text-gray-700 mb-3">Login Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <InputField name="userName" label="Username" type="text" placeholder="Enter Your Username" />
                  <InputField name="password" label="Password" type="password" placeholder="Enter Your Password" />
                  <div className="flex flex-wrap gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="isActive" name="status" className="accent-orange-500" />
                      <label htmlFor="isActive" className="text-sm">IsActive</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="isLocked" name="status" className="accent-orange-500" />
                      <label htmlFor="isLocked" className="text-sm">IsLocked</label>
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
                  type="button" onClick={()=>navigate(-1)}
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
