import { useState, useEffect } from 'react';
import InputField from '@/components/common/formFields/InputField';
import SelectField from '@/components/common/formFields/SelectField';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { dropdownService } from '@/api/dropdown/service';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { walletService } from "@/api/wallet/service";
import { showToast } from '@/utils/toast';
import CircleLoader from '@/components/common/loader/CircleLoader';
import { Calendar } from 'lucide-react';
import { userService } from '@/api/user/services';
import DateField from '@/components/ui/DateField';
import { userPayload } from '@/api/user/payloadBuilder';

interface FormValues {
  walletTypeId: string;
  userId: string;
  amount: string;
  transferTypeId: string;
  paymentDate: string;
  bankAccountId: string;
  paymentReferenceNumber: string;
  remark: string;
  isPullOut: boolean;
}

export interface OptionType {
  id: number | string;
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
  paymentReferenceNumber: Yup.string().required(
    'Cheque/Ref number is required'
  ),
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
    paymentReferenceNumber: '',
    remark: '',
    isPullOut: false,
  });

  // load Dropdown data
  useEffect(() => {
    Promise.all([
      getWalletTypeDropdown(),
      getUserDropdownService(),
      getTransferTypeDropdown(),
      getBankAccountDropdown(),
    ]);
  }, []);

  useEffect(() => {
    if (page && id && page !== 'ADD') {
      getUserByIdService(id);
    }
  }, [page, id]);

  // Load dropdowns
  const getUserDropdownService = async () => {
    try {
      const res = await dropdownService.UserDropdown();
      if (res?.success) {
        const data = res.data as Array<{
          value: number | string;
          text: string;
        }>;
        //setUsers(data.map(({ value, text }) => ({ value, name: text })));
        setUsers(
          data.map(({ value, text }) => ({
            id: String(value),
            name: text || 'Unnamed',
          }))
        );
      }
      // console.log('User list API:', res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getWalletTypeDropdown = async () => {
    try {
      const res = await dropdownService.GstType();
      if (res?.success) {
        const data = res.data as Array<{
          id: string | number;
          gstName: string;
        }>;
        setWalletTypes(
          data.map(({ id, gstName }) => ({
            id: String(id),
            name: gstName || 'Unnamed',
          }))
        );
      }
    } catch (err) {
      console.error('Error loading Wallet Types:', err);
    }
  };

  const getTransferTypeDropdown = async () => {
    try {
      const res = await dropdownService.TransferType();
      if (res?.success) {
        const data = res.data as Array<{
          value: string | number;
          text: string;
        }>;
        setTransferTypes(
          data.map(({ value, text }) => ({
            id: String(value),
            name: text || 'Unnamed',
          }))
        );
      }
    } catch (err) {
      console.error('Error loading Wallet Types:', err);
    }
  };

  const getBankAccountDropdown = async () => {
    try {
      const res = await dropdownService.BankDropdown();
      if (res?.success) {
        const data = res.data as Array<{
          value: string | number;
          text: string;
        }>;
        setBankAccounts(
          data.map(({ value, text }) => ({
            id: String(value),
            name: text || 'Unnamed',
          }))
        );
      }
    } catch (err) {
      console.error('Error loading Wallet Types:', err);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setLoader(true);
    try {
      const res = await userService.AddUpdateWalletTransaction({
        ...values,
        id: id || undefined,
      });
      setLoader(false);

      if (res?.success) {
        showToast.success(
          res.message ||
            (page === 'EDIT'
              ? 'Wallet updated successfully'
              : 'Wallet added successfully')
        );
        setTimeout(() => navigate('/users/wallet-list'), 2000);
      } else {
        showToast.error(res?.message || 'Failed');
      }
    } catch (err: any) {
      console.error(
        'Add/Edit wallet error:',
        err.response?.data || err.message
      );
      setLoader(false);
    }
  };

  const getUserByIdService = async (userId: string) => {
    setLoader(true);
    try {
      const res = await userService.GetUserById(userId);
      setLoader(false);
      if (res?.success) {
        const data = res.data as Partial<FormValues>;
        setInitialValues({
          walletTypeId: data.walletTypeId?.toString() || '',
          userId: data.userId?.toString() || '',
          amount: data.amount?.toString() || '',
          transferTypeId: data.transferTypeId?.toString() || '',
          paymentDate: data.paymentDate || '',
          bankAccountId: data.bankAccountId?.toString() || '',
          paymentReferenceNumber: data.paymentReferenceNumber || '',
          remark: data.remark || '',
          isPullOut: data.isPullOut ?? false,
        });
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  const isViewMode = page === 'VIEW';
  // console.log("Users",users);

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
            onSubmit={handleSubmit}
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
                    placeholder="Select Wallet Type"
                  />
                  <SelectField
                    name="userId"
                    label="User"
                    options={users}
                    disabled={isViewMode}
                    placeholder="Select User"
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
                    placeholder="Select Transfer Type"
                  />

                  {/* Payment Date */}
                  <DateField
                    name="paymentDate"
                    label="Payment Date"
                    disabled={isViewMode}
                  />

                  <SelectField
                    name="bankAccountId"
                    label="Bank Account"
                    options={bankAccounts}
                    disabled={isViewMode}
                    placeholder="Select Bank Account"
                  />
                  <InputField
                    name="paymentReferenceNumber"
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
