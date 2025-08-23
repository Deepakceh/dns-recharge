import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { bankService } from "@/api/bank/services";
import { SearchSheet } from "@/components/common/SearchSheet";
import CircleLoader from "@/components/common/loader/CircleLoader";
import SelectField from "@/components/common/formFields/SelectField";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface filterFormValues {
  bankAccount: string;
  transferType: string;
  user: string;
  walletType: string;
  fromDate: string;
  toDate: string;
}
interface UserState {
  page: number;
  size: number;
  search: string;
  data: UserRowData[];

}
type UserRowData = {
  id: number;
  // roleId: number;
  fullName: string;
  // roleName: string;
  // parentName: string;
  // email: string;
  // mobileNumber: string;
  orgName: string;
  p2PBalance: number;
  p2ABalance: number;
  isOn: boolean;
  isActive: boolean;
}
export default function StatementList() {
  const gridRef = useRef(null);
  const [loader] = useState(false)
  const [open, setOpen] = useState(false);
  
  const [user, setUser] = useState<UserState>({
    page: 1,
    size: 100,
    search: '',
    data: []
  });

  useEffect(() => {
    getStatementListService(user.page, user.size);
  }, [user.page, user.size]);

  //  api call for get statement list data
  const getStatementListService = async (page: number, size: number) => {
    try {
      const res = await bankService.GetBankStatementData("GET_BANK_STATEMENT", { page: page, size: size });
      if (res?.success && Array.isArray(res?.data)) {
        setUser((prev) => ({
          ...prev,
          data: res.data as UserRowData[]
        }));
      }
    } catch (err) {
      console.error("User API Error:", err);
    }
  };

  const [dropdown] = useState({
    bankAccount: [
      { value: "", label: "Select" },
      { value: "State Bank Of India", label: "State Bank Of India" },
      { value: "Punjab National Bank", label: "Punjab National Bank" },
    ],
    transferType: [
      { value: "", label: "Select" },
      { value: "type 1", label: "Type 1" },
      { value: "type 2", label: "Type 2" },
    ],
    user: [
      { value: "", label: "Select" },
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
    ],
    walletType: [
      { value: "", label: "Select" },
      { value: "type 1", label: "Type 1" },
      { value: "type 2", label: "Type 2" },
    ],
  })

  const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("filter Data:", values);
    resetForm();
  };
  // ag grig table 
  const columnDefs: ColDef[] = [
    { headerName: "S.NO.", field: "id", width: 60, suppressSizeToFit: true },
    { headerName: "BANK NAME", field: "BankName", width: 150 },
    { headerName: "ORG. NAME", field: "OrgName", width: 180 },
    { headerName: "ADDED DATE", field: "AddedDate", width: 120 },
    { headerName: "PAYMENT REF. NO.", field: "PaymentRefNo", width: 140 },
    { headerName: "TRANSFER TYPE", field: "TransferType", width: 130 },
    { headerName: "GST TYPE", field: "GstType", width: 100 },
    { headerName: "AMOUNT TYPE", field: "AmountType", width: 120 },
    { headerName: "TXN TYPE", field: "TxnType", width: 100 },
    { headerName: "CL_BAL", field: "CL_BAL", width: 100 },
    { headerName: "DB_AMOUNT", field: "DB_AMOUNT", width: 120 },
    { headerName: "OP_BAL", field: "OP_BAL", width: 100 },
    { headerName: "TXN ID", field: "TxnId", width: 100 },
    { headerName: "REMARKS", field: "Remarks", width: 120 },
  ];



  return (
    <>
      {loader && <CircleLoader />}
      <div className="p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-2">
            {/* Left: Filter + Search */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="h-8 px-2 text-sm text-gray-500 border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition duration-200 flex items-center gap-1"
              >
                <span className="text-base"><Filter className="text-orange-500" /></span>
                Filter
              </Button>

              <div className="w-72">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search Users by Name, Email or Date"
                    className="h-8 text-sm pl-9 pr-3 bg-purple-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right: Export + Add */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 px-3 text-sm border border-yellow-300 hover:bg-amber-200 bg-amber-100 text-yellow-600"
              >
                Export
              </Button>
            </div>
          </div>
          <div className="ag-theme-quartz w-full" style={{ height: '75vh' }}>
            <AgGridReact
              ref={gridRef}
              columnDefs={columnDefs}
              rowData={user.data}
              rowHeight={40}
              headerHeight={35}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
            />
          </div>
        </div>
        <SearchSheet open={open} onOpenChange={setOpen} title="Search Panel">
          <Formik
            initialValues={{
              bankAccount: '',
              transferType: '',
              user: '',
              walletType: '',
              fromDate: '',
              toDate: ''
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField name="Bank Account" label="Bank Account" options={dropdown.bankAccount} className="border" />
                  <SelectField name="Transfer Type" label="Transfer Type" options={dropdown.transferType} className="border" />
                  <SelectField name="User" label="User" options={dropdown.user} className="border" />
                  <SelectField name="Wallet Type" label="Wallet Type" options={dropdown.walletType} className="border" />
                </div>

                <div className="flex gap-4 mt-10">
                  <Button type="submit" className="w-full bg-orange-500 text-white hover:brightness-90">Search</Button>
                  <Button type="button" onClick={() => setOpen(false)}
                    variant="outline" className="w-full border border-blue-900 text-blue-900 hover:bg-blue-50">Cancel</Button>
                </div>
              </Form>
            )}
          </Formik>
        </SearchSheet>

      </div>
    </>
  );

}