import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eye, Trash2, Filter, Search } from "lucide-react";
import InputField from "@/components/common/formFields/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { bankService } from "@/api/bank/services";
import { SearchSheet } from "@/components/common/SearchSheet";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { ToggleStatusIndicator } from "@/components/common/ToggleStatusIndicator";
import { commonService } from "@/api/common/service";
import { showToast } from "@/utils/toast";

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface filterFormValues {
  accountNo: string;
  holderName: string;
  bankName: string;
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


export default function AccountList() {
  const navigate = useNavigate()
  const gridRef = useRef(null);
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserState>({
    page: 1,
    size: 100,
    search: '',
    data: []
  });

  useEffect(() => {
    getBankListService(user.page, user.size);
  }, [user.page, user.size]);

  //  api call for get user list data
  const getBankListService = async (page: number, size: number) => {
    try {
      const res = await bankService.GetBankAccountData("GET_BANK_LIST", { page: page, size: size });
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

   const handleToggle = async (action: string, rowData: UserRowData) => {
      setLoader(true)
      let payload: UserRowData;
      const status = !rowData.isActive;
      // Prepare payload based on action
      if (action === 'BANK_ACCOUNT_STATUS') {
        payload = { ...rowData, isActive: status };
      } else {
        payload = rowData; // For delete or other actions
      }
      try {
        const res = await commonService.CommonToggle(action, 'UpdateBankStatus', payload);
        if (res?.success) {
          setLoader(false)
          showToast.success(res.message || 'Updated Successfully');
  
          setUser((prev) => {
            let updatedData;
  
            if (action === 'BANK_ACCOUNT_STATUS') {
              // ✅ Toggle isActive value
              updatedData = prev.data.map((user) =>
                user.id === rowData.id ? { ...user, isActive: status } : user
              );
            } else {
              // ✅ Remove the row for other actions (like delete)
              updatedData = prev.data.filter((user) => user.id !== rowData.id);
            }
            return {
              ...prev,
              data: updatedData,
            };
          });
        }
      } catch (err) {
        console.error("User API Error:", err);
        setLoader(false)
      }
    };

  const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("filter Data:", values);
    resetForm();
  };


  // ag grig table 
  const columnDefs: ColDef[] = [
    { headerName: "S.NO.", field: "id", width: 60, suppressSizeToFit: true },
    {
      headerName: "ACTION",
      field: "action",
      width: 100,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams<UserRowData>) => {
        const { data } = params;
        if (!data) return null;
        return (
          <div className="flex items-center gap-2 justify-center">
            <span title="Edit" onClick={() => navigate(`/bank/account-list/edit/${data?.id}`)}><Pencil className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
            <span title="View" onClick={() => navigate('/bank/statement-list')}><Eye className="text-indigo-400 cursor-pointer w-5 h-5" /></span>
            <span title="Delete" onClick={() => handleToggle('BANK_ACCOUNT_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
          </div>
        )
      },
    },
    {
      headerName: "STATUS",
      field: "isActive",
      width: 100,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams<UserRowData, boolean>) => {
        const { value, data } = params;
        if (!data) return null;
        return (
          <ToggleStatusIndicator isOn={!!value} onToggle={() => handleToggle('BANK_ACCOUNT_STATUS', data)} />
        );
      },
    },
    { headerName: "BANK NAME", field: "bankName", width: 150 },
    { headerName: "BRANCH NAME", field: "branchName", width: 180 },
    { headerName: "BRNACH ADDRESS", field: "branchAddress", width: 180 },
    { headerName: "ACCOUNT TYPE", field: "accountType", width: 140 },
    { headerName: "ACCOUNT NO.", field: "accountNumber", width: 140 },
    { headerName: "IFSC CODE", field: "ifscCode", width: 130 },
    { headerName: "HOLDER NAME", field: "accountHolderName", width: 150 },
    { headerName: "UPI ADDRESS", field: "upiAddress", width: 130 },
    { headerName: "ORG. NAME", field: "urgName", width: 120 },
    { headerName: "VENDOR", field: "Vendor", width: 120 },
    { headerName: "BALANCE", field: "Balance", width: 120 },
    { headerName: "MIN. LIMIT", field: "MinLimit", width: 120 },
    { headerName: "REMARKS", field: "remark", width: 160 }
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
              <Link to='/bank/account-list/add' >
                <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
                  ADD
                </Button>
              </Link>
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
              accountNo: "",
              holderName: "",
              bankName: ""
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6" onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault() }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField name="accountNo" label="Account Number" type="text" placeholder="Enter account number" className="border" />
                  <InputField name="holderName" label="Holder Name" type="text" placeholder="Enter holder name" className="border" />
                  <InputField name="bankName" label="Bank Name" type="text" placeholder="Enter bank name" className="border" />
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