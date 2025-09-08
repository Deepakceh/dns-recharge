import { useState, useEffect } from 'react';
import InputField from '@/components/common/formFields/InputField';
import SelectField from '@/components/common/formFields/SelectField';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { dropdownService } from '@/api/dropdown/service';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
//import { walletService } from "@/api/wallet/service";
import { showToast } from '@/utils/toast';
import CircleLoader from '@/components/common/loader/CircleLoader';
import { Calendar } from 'lucide-react';

interface FormValues {
  walletTypeId: string;
  userId: string;
  amount: string;
  transferTypeId: string;
  paymentDate: string;
  bankAccountId: string;
  chequeRefNumber: string;
  remark: string;
  isPullOut: boolean;
}

interface OptionType {
  id: number;
  name: string;
}

const validationSchema = Yup.object({
  walletTypeId: Yup.string().required('Wallet type is required'),
  userId: Yup.string().required('User is required'),
  amount: Yup.number()
    .typeError('Must be a number')
    .required('Amount is required'),
  transferTypeId: Yup.string().required('Transfer type is required'),
  paymentDate: Yup.string().required('Payment date is required'),
  chequeRefNumber: Yup.string().required('Cheque/Ref number is required'),
  remark: Yup.string().required('Remark is required'),
});

const AddWallet: React.FC = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams<{ mode: string; id?: string }>();
  const page = mode?.toUpperCase();

  const [loader, setLoader] = useState(false);
  const [walletTypes, setWalletTypes] = useState<OptionType[]>([]);
  const [users, setUsers] = useState<OptionType[]>([]);
  const [transferTypes, setTransferTypes] = useState<OptionType[]>([]);
  const [bankAccounts, setBankAccounts] = useState<OptionType[]>([]);

  const [initialValues, setInitialValues] = useState<FormValues>({
    walletTypeId: '',
    userId: '',
    amount: '',
    transferTypeId: '',
    paymentDate: '',
    bankAccountId: '',
    chequeRefNumber: '',
    remark: '',
    isPullOut: false,
  });

  useEffect(() => {
    Promise.all([
      getWalletTypeDropdown(),
      getUserDropdown(),
      getTransferTypeDropdown(),
      getBankAccountDropdown(),
    ]);
  }, []);

  useEffect(() => {
    if (page && id && page !== 'ADD') {
      getWalletById(id);
    }
  }, [page, id]);

  const getWalletTypeDropdown = async () => {
    //const res = await dropdownService.WalletTypes();
    //if (res?.success) setWalletTypes(res.data.map((x: any) => ({ id: x.id, name: x.name })));
  };

  const getUserDropdown = async () => {
    //const res = await dropdownService.Users();
    //if (res?.success) setUsers(res.data.map((x: any) => ({ id: x.id, name: x.name })));
  };

  const getTransferTypeDropdown = async () => {
    //const res = await dropdownService.TransferTypes();
    //if (res?.success) setTransferTypes(res.data.map((x: any) => ({ id: x.id, name: x.name })));
  };

  const getBankAccountDropdown = async () => {
    //const res = await dropdownService.BankAccounts();
    //if (res?.success) setBankAccounts(res.data.map((x: any) => ({ id: x.id, name: x.name })));
  };

  const getWalletById = async (walletId: string) => {
    setLoader(true);
    try {
      //const res = await walletService.GetWalletById(walletId);
      setLoader(false);
      //   if (res?.success) {
      //     const data = res.data as Partial<FormValues>;
      //     setInitialValues({
      //       walletTypeId: data.walletTypeId?.toString() || "",
      //       userId: data.userId?.toString() || "",
      //       amount: data.amount?.toString() || "",
      //       transferTypeId: data.transferTypeId?.toString() || "",
      //       paymentDate: data.paymentDate || "",
      //       bankAccountId: data.bankAccountId?.toString() || "",
      //       chequeRefNumber: data.chequeRefNumber || "",
      //       remark: data.remark || "",
      //       isPullOut: data.isPullOut ?? false,
      //     });
      //   }
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  //   const handleSubmit = async (values: FormValues) => {
  //     setLoader(true);
  //     try {
  //       const res = await walletService.AddUpdateWallet({ ...values, id: id || undefined });
  //       setLoader(false);
  //       if (res?.success) {
  //         showToast.success(res.message || (page === "EDIT" ? "Wallet updated successfully" : "Wallet added successfully"));
  //         setTimeout(() => navigate("/wallet/list"), 2000);
  //       } else {
  //         showToast.error(res?.message || "Failed");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setLoader(false);
  //     }
  //   };

  const isViewMode = page === 'VIEW';

  return (
    <>
      {loader && <CircleLoader />}
      <div className="p-4">
        <div className="px-6 pb-12 pt-2 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">
            {page === 'EDIT'
              ? 'Edit Wallet'
              : page === 'VIEW'
                ? 'View Wallet'
                : 'Add Wallet'}
          </h3>
          <Separator className="my-2 bg-gray-200" />

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            //onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form
                className="space-y-6"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <SelectField
                    name="walletTypeId"
                    label="Wallet Type"
                    options={walletTypes}
                    disabled={isViewMode}
                  />
                  <SelectField
                    name="userId"
                    label="User"
                    options={users}
                    disabled={isViewMode}
                  />
                  <InputField
                    name="amount"
                    label="Amount"
                    type="text"
                    placeholder="Enter Amount"
                    disabled={isViewMode}
                  />
                  <SelectField
                    name="transferTypeId"
                    label="Transfer Type"
                    options={transferTypes}
                    disabled={isViewMode}
                  />

                  {/* Payment Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Payment Date
                    </label>
                    <div className="relative">
                      <InputField
                        name="paymentDate"
                        type="date"
                        placeholder="mm/dd/yyyy"
                        disabled={isViewMode}
                        label={''}
                      />
                      <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-orange-500" />
                    </div>
                  </div>

                  <SelectField
                    name="bankAccountId"
                    label="Bank Account"
                    options={bankAccounts}
                    disabled={isViewMode}
                  />
                  <InputField
                    name="chequeRefNumber"
                    label="Cheque/Ref Number"
                    type="text"
                    placeholder="Enter Ref Number"
                    disabled={isViewMode}
                  />
                  <div>
                    <label
                      htmlFor="remark"
                      className="block text-sm font-medium mb-1"
                    >
                      Remark
                    </label>
                    <textarea
                      id="remark"
                      name="remark"
                      value={values.remark}
                      onChange={(e) => setFieldValue('remark', e.target.value)}
                      placeholder="Enter Remark"
                      disabled={isViewMode}
                      rows={3}
                      className={`w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
                        isViewMode
                          ? 'bg-gray-100 cursor-not-allowed'
                          : 'bg-white'
                      }`}
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      id="isPullOut"
                      checked={values.isPullOut}
                      onChange={(e) =>
                        setFieldValue('isPullOut', e.target.checked)
                      }
                      disabled={isViewMode}
                      className="accent-orange-500 w-4 h-4 "
                    />
                    <label htmlFor="isPullOut" className="text-sm font-medium">
                      IsPullOut?
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                {!isViewMode && (
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-orange-500 text-white w-full sm:w-48 hover:bg-orange-600"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => navigate(-1)}
                      variant="outline"
                      className="w-full sm:w-48 border-red-400 text-red-500 hover:bg-red-50"
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

export default AddWallet;
