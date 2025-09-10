import { useState, useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
// import { Switch } from "@/components/ui/switch";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pencil,
  Trash2,
  SquarePlus,
  Filter,
  Search,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  XSquare,
} from 'lucide-react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import InputField from '@/components/common/formFields/InputField';
import SelectField from '@/components/common/formFields/SelectField';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/api/user/services';
import { dropdownService } from '@/api/dropdown/service';
import { commonService } from '@/api/common/service';
import { ToggleStatusIndicator } from '@/components/common/ToggleStatusIndicator';
import { showToast } from '@/utils/toast';
import CircleLoader from '@/components/common/loader/CircleLoader';
import { SearchSheet } from '@/components/common/SearchSheet';
import DateField from '@/components/ui/DateField';
import OptionType from './add';
import { userPayload } from '@/api/user/payloadBuilder';

// Register AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

type WalletRowData = {
  id: number;
  actionId: string;
  txnId: string;
  statusName: string;
  bankName: string;
  orgName: string;
  paymentRefNo: string;
  amount: number;
  paymentDate: string;
  addedDate: string;
  updatedDate: string;
  addedBy: string;
  updatedBy: string;
  remark: string;
  txnType: string;
  amtType: string;
  transferType: string;
  gstType: string;
};

interface WalletState {
  page: number;
  size: number;
  search: string;
  data: WalletRowData[];
}
interface filterFormValues {
  mobile: string;
  email: string;
  user: string;
  role: string;
  status: string;
}

interface OptionType {
  id: number;
  name: string;
}

const WalletList: React.FC = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<OptionType[]>([]);
  const [transferTypes, setTransferTypes] = useState<OptionType[]>([]);
  const [bankAccounts, setBankAccounts] = useState<OptionType[]>([]);

  // Dummy data
  const [wallet, setWallet] = useState<WalletState>({
    page: 1,
    size: 100, // default rows per page
    search: '',
    data: [],
  });

  // load Dropdown data
  useEffect(() => {
    Promise.all([
      getUserDropdownService(),
      getTransferTypeDropdown(),
      getBankAccountDropdown(),
    ]);
  }, []);

  useEffect(() => {
    getWalletListService(wallet.page, wallet.size);
  }, [wallet.page, wallet.size]);

  //  api call for get user list data
  const getWalletListService = async (page: number, size: number) => {
    try {
      const res = await userService.GetWalletTransactionList(
        'GET_WALLET_LIST',
        { page: page, size: size }
      );
      console.log('res', res);
      if (res?.success && Array.isArray(res?.data)) {
        setWallet((prev) => ({
          ...prev,
          data: res.data as WalletRowData[],
        }));
      }
    } catch (err) {
      console.error('User API Error:', err);
    }
  };

  // Handle Filter
  const handleFilterSubmit = async (values: any) => {
  try {
    setLoader(true);

    // Build payload using existing payload builder
    const payload = userPayload('GET_WALLET_LIST', {
      page: wallet.page,
      size: wallet.size,
      bankAccountId: values.bankAccount,
      transferTypeId: values.transferType,
      userId: values.user,
      statusId: values.status,
      fromDate: values.fromDate,
      toDate: values.toDate,
      paymentReferenceNumber: values.paymentRef,
    });

    const res = await userService.GetWalletTransactionList(
      'GET_WALLET_LIST',
      payload
    );

    if (res?.success && Array.isArray(res.data)) {
      setWallet((prev) => ({
        ...prev,
        data: res.data as WalletRowData[],
      }));
    }
  } catch (err) {
    console.error('Filter API Error:', err);
  } finally {
    setLoader(false);
    setOpen(false);
  }
};


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
            id: Number(value), // ✅ convert to number
            name: text || 'Unnamed',
          }))
        );
      }
      // console.log('User list API:', res.data);
    } catch (err) {
      console.error(err);
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
            id: Number(value),
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
            id: Number(value),
            name: text || 'Unnamed',
          }))
        );
      }
    } catch (err) {
      console.error('Error loading Wallet Types:', err);
    }
  };

  // Accept / Reject handlers
  const handleAccept = (id: number) => {
    setWallet((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === id ? { ...item, statusName: 'Approved' } : item
      ),
    }));
  };

  const handleReject = (id: number) => {
    setWallet((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === id ? { ...item, statusName: 'Rejected' } : item
      ),
    }));
  };

  // Columns
  const columnDefs: ColDef[] = [
    {
      headerName: 'ACTION',
      field: 'actionId',
      width: 120,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams<WalletRowData>) => {
        const { data } = params;
        if (!data) return null;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAccept(data.id)}
              className="p-1 border border-green-500 rounded hover:bg-green-50"
              title="Accept"
            >
              <CheckSquare className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => handleReject(data.id)}
              className="p-1 border border-red-500 rounded hover:bg-red-50"
              title="Reject"
            >
              <XSquare className="w-5 h-5 text-red-600" />
            </button>
          </div>
        );
      },
    },
    { headerName: 'ID', field: 'actionId', width: 70 },
    { headerName: 'TXN ID', field: 'txnId', width: 100 },
    {
      headerName: 'STATUS NAME',
      field: 'statusName',
      width: 130,
      cellStyle: (params) => {
        if (params.value === 'Approved') return { color: '#10B981' };
        if (params.value === 'Pending') return { color: '#F59E0B' };
        if (params.value === 'Rejected') return { color: '#EF4444' };
        return null;
      },
    },
    { headerName: 'BANK NAME', field: 'bankName', width: 150 },
    { headerName: 'ORG. NAME', field: 'orgName', width: 180 },
    { headerName: 'PAYMENT REF NO.', field: 'paymentRefNo', width: 160 },
    {
      headerName: 'AMOUNT',
      field: 'amount',
      width: 120,
      cellRenderer: (params: any) => `$${params.value.toLocaleString()}`,
    },
    { headerName: 'PAYMENT DATE', field: 'paymentDate', width: 130 },
    { headerName: 'ADDED DATE', field: 'addedDate', width: 130 },
    { headerName: 'UPDATED DATE', field: 'updatedDate', width: 130 },
    { headerName: 'ADDED BY', field: 'addedBy', width: 130 },
    { headerName: 'UPDATED BY', field: 'updatedBy', width: 130 },
    { headerName: 'REMARK', field: 'remark', width: 200 },
    {
      headerName: 'TXN TYPE',
      field: 'txnType',
      width: 100,
      cellStyle: (params) =>
        params.value === 'Credit' ? { color: '#10B981' } : { color: '#EF4444' },
    },
    { headerName: 'AMT TYPE', field: 'amtType', width: 100 },
    { headerName: 'TRANSFER TYPE', field: 'transferType', width: 150 },
    { headerName: 'GST TYPE', field: 'gstType', width: 100 },
  ];

  // Pagination calculations (derived values)
  const totalRows = wallet.data.length;
  const effectiveSize = wallet.size > 0 ? wallet.size : 1;
  const totalPages = Math.max(1, Math.ceil(totalRows / effectiveSize));
  const effectivePage = Math.min(Math.max(wallet.page, 1), totalPages);
  const startIndex = (effectivePage - 1) * effectiveSize;
  const endIndex = Math.min(startIndex + effectiveSize, totalRows);
  const currentRows = wallet.data.slice(startIndex, endIndex);

  // Pagination helpers
  const goToPrev = () =>
    setWallet((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  const goToNext = () =>
    setWallet((prev) => ({
      ...prev,
      page: Math.min(totalPages, prev.page + 1),
    }));

  // rows per page handler (supports "all")
  const handleSizeChange = (val: string) => {
    const newSize =
      val === 'all' ? Math.max(totalRows, 1) : Math.max(parseInt(val, 10), 1);
    setWallet((prev) => ({ ...prev, size: newSize, page: 1 }));
  };

  // display label for rows-per-page (shows "All" when size equals totalRows)
  const displaySizeLabel = wallet.size >= totalRows ? 'All' : wallet.size;

  return (
    <div className="p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="h-8 px-2 text-sm text-gray-600 border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition duration-200 flex items-center gap-2"
            >
              <Filter className="text-orange-500" size={16} />
              Filter
            </Button>

            <div className="w-72 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by Bank, Org, Ref No or Date"
                className="h-8 text-sm pl-9 pr-3 bg-purple-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
              />
            </div>
          </div>
          <Link to="/users/wallet-list/Add">
            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
              ADD
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="ag-theme-quartz w-full" style={{ height: '70vh' }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={currentRows}
            rowHeight={40}
            headerHeight={35}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            enableCellTextSelection
            ensureDomOrder
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Rows per page</span>
            <div className="relative inline-flex items-center">
              <select
                aria-label="Rows per page"
                value={
                  wallet.size >= totalRows ? 'all' : wallet.size.toString()
                }
                onChange={(e) => handleSizeChange(e.target.value)}
                className="appearance-none h-8 pl-3 pr-8 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-200"
              >
                <option value="10">100</option>
                <option value="100">500</option>
                <option value="1000">1000</option>
                <option value="all">All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="text-sm text-gray-600">
              <span>
                {totalRows === 0
                  ? '0 of 0'
                  : `${startIndex + 1}-${endIndex} of ${totalRows} (Rows: ${displaySizeLabel})`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={effectivePage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-700">
              Page {effectivePage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={effectivePage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Filter SearchSheet */}
      <SearchSheet
        open={open}
        onOpenChange={setOpen}
        title="Wallet Request Filter"
      >
        <Formik
          initialValues={{
            bankAccount: '',
            transferType: '',
            user: '',
            status: '',
            fromDate: '',
            toDate: '',
            paymentRef: '',
          }}
          onSubmit={(values) => handleFilterSubmit(values)}
        >
         {() => (
            <Form
              className="space-y-6"
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <SelectField
                  name="bankAccount"
                  label="Bank Account"
                  options={bankAccounts} // API data
                  placeholder="Select Bank Account"
                />
                <SelectField
                  name="transferType"
                  label="Transfer Type"
                   options={transferTypes} // API data
                  placeholder="Select Transfer Type"
                />
                <SelectField
                  name="user"
                  label="User"
                  options={users} // API data
                  placeholder="Select User"
                />
                <SelectField
                  name="status"
                  label="Status"
                  options={[
                    { id: 1, name: 'Pending' },
                    { id: 2, name: 'Approved' },
                    { id: 3, name: 'Rejected' },
                  ]}
                  placeholder="Select Status"
                />
                <DateField name="fromDate" label="From Date" className="relative z-50"/>
                <DateField name="toDate" label="To Date" className="relative z-50" />
                <InputField
                  name="paymentRef"
                  label="Payment Reference Number"
                  type="text"
                  placeholder="Enter Payment Reference Number"
                />
              </div>
              <div className="flex gap-4 mt-10">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 text-white hover:brightness-90"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="w-full border border-red-400 text-red-500 hover:bg-red-50"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </SearchSheet>
    </div>
  );
};

export default WalletList;
