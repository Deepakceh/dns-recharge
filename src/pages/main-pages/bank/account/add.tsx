import { useState, useEffect } from "react";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { dropdownService } from "@/api/dropdown/service";
import { Formik, Form } from "formik";
import { getValidationSchema } from "@/utils/validation";
import * as Yup from "yup";
// import { showToast } from "@/utils/toast";
import CircleLoader from "@/components/common/loader/CircleLoader";
interface FormValues {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    upiAddress: string;
    accountTypeId: string;
    remark: string;
    bankId: string;
    branchName: string;
    branchAddress: string;
    // addedById: string;
    // blockAmount: string;
}
interface OptionType {
    id: number;
    name: string;
}

const validationSchema = () => Yup.object({
    accountNumber: getValidationSchema({ isRequired: true}),
    ifscCode: getValidationSchema({ isRequired: true }),
    accountHolderName: getValidationSchema({ isRequired: true }),
    upiAddress: getValidationSchema({ isRequired: true }),
    accountTypeId: getValidationSchema({ isRequired: true }),
    bankId: getValidationSchema({ isRequired: true }),
    branchName: getValidationSchema({ isRequired: true }),
    branchAddress: getValidationSchema({ isRequired: true }),
});

export default function AddAccount() {
    const navigate = useNavigate()
    // const { mode, id } = useParams<{ mode: string; id?: string }>();
    // const page = mode?.toUpperCase();

    const [loader] = useState(false)
    const [AccountTypeData, setAccountTypeData] = useState<OptionType[]>([]);
    const [bankData, setBankData] = useState<OptionType[]>([]);
    const [initialValues] = useState<FormValues>({
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        upiAddress: "",
        accountTypeId: "",
        remark: "",
        bankId: "",
        branchName: "",
        branchAddress: "",
    });

    // Load dropdowns
    useEffect(() => {
        Promise.all([getAccountTypeDropdownService(), getBankDropdownService()]);
    }, []);

    const getAccountTypeDropdownService = async () => {
        try {
            const res = await dropdownService.AccountType();
            if (res?.success) {
                const data = res.data as Array<{ value: number; text: string }>;
                setAccountTypeData(data.map((acount)=>({ id: acount.value, name: acount.text })));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getBankDropdownService = async () => {
        try {
            const res = await dropdownService.BankDropdown();
            if (res?.success) {
                const data = res.data as Array<{ value: number; text: string }>;
                setBankData(data.map((bank)=>({ id: bank.value, name: bank.text })));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        console.log("filter Data:", values);
        resetForm();
    };

    return (
        <>
            {loader && <CircleLoader />}
            <div className="p-4">
                <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">Add Bank Account</h3>
                    <Separator className="my-2 bg-gray-200" />
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form className="space-y-6" onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault() }}>
                                <div>
                                    <h4 className="text-base font-semibold text-gray-700 mt-3 mb-3">Account Info</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <InputField name="accountNumber" label="Account Number" type='text' inputMode="int" placeholder="Enter account number" />
                                        <InputField name="ifscCode" label="IFSC Code" type="text" capitalize={true} inputMode="alphanum" placeholder="Enter ifsc code" />
                                        <InputField name="accountHolderName" label="Holder Name" type="text" inputMode="alpha" placeholder="Enter holder name" />
                                        <InputField name="upiAddress" label="UPI Address" type="text" placeholder="Enter upi address" />
                                        <SelectField name="accountTypeId" label="account Type" options={AccountTypeData} />
                                        <InputField name="remark" label="Remarks" type="text" placeholder="Enter remarks" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-base font-semibold text-gray-700 mb-3">Bank Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <SelectField name="bankId" label="Bank Name" options={bankData} />
                                        <InputField name="branchName" label="Branch Name" type="text"inputMode="alpha" placeholder="Enter branch name" />
                                        <InputField name="branchAddress" label="Branch Address" type="text" placeholder="Enter branch address" />
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
        </>
    );
}
