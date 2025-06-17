import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
interface formValues {
    accountNo: string;
    ifsc: string;
    name: string;
    upi: string;
    accountType: string;
    remarks: string;
    bankName: string;
    branchName: string;
    branchAdd: string;
}

export default function AddAccount() {
    const navigate = useNavigate()
    const [dropdown] = useState({
        accountType: [
            { value: "", label: "Select" },
            { value: "saving", label: "Saving" },
            { value: "current", label: "Current" },
        ]
    });

    const handleSubmit = (
        values: formValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        console.log("filter Data:", values);
        resetForm();
    };

    return (
        <div className="p-4">
            <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Add Bank Account</h3>
                <Separator className="my-2 bg-gray-200" />

                <Formik
                    initialValues={{
                        accountNo: "",
                        ifsc: "",
                        name: "",
                        upi: "",
                        accountType: "",
                        remarks: "",
                        bankName: "",
                        branchName: "",
                        branchAdd: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            <div>
                                <h4 className="text-base font-semibold text-gray-700 mt-3 mb-3">Account Info</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <InputField name="accountNo" label="Account Number" type="text" placeholder="Enter account number" />
                                    <InputField name="ifsc" label="IFSC Code" type="text" placeholder="Enter ifsc code" />
                                    <InputField name="name" label="Holder Name" type="text" placeholder="Enter holder name" />
                                    <InputField name="name" label="Holder Name" type="text" placeholder="Enter holder name" />
                                    <InputField name="upi" label="UPI Address" type="text" placeholder="Enter upi address" />
                                    <SelectField name="accountType" label="account Type" options={dropdown.accountType} />
                                    <InputField name="remarks" label="Remarks" type="text" placeholder="Enter remarks" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-gray-700 mb-3">Bank Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <InputField name="bankName" label="Bank Name" type="text" placeholder="Enter bank name" />
                                    <InputField name="branchName" label="Branch Name" type="text" placeholder="Enter branch name" />
                                    <InputField name="branchAdd" label="Branch Address" type="text" placeholder="Enter branch address" />
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
