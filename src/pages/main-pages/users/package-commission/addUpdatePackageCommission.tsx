
import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// import { ErrorMessage, Form, Formik } from "formik";
// import * as Yup from "yup";
import type { ColDef, } from "ag-grid-community";
import { userService } from "@/api/user/services";
// import InputField from "@/components/common/formFields/InputField";
// import { useNavigate } from "react-router-dom";
// import CircleLoader from "@/components/common/loader/CircleLoader";
// import { userService } from "@/api/user/services";
// import { showToast } from "@/utils/toast";
// import { getValidationSchema } from "@/utils/validation";
// Register all AG Grid Community modules
import { useParams } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

type UserRowData = {
  id: number;
  packageName: string;

};

interface UserState {
  page: number;
  size: number;
  search: string;
  data: UserRowData[];
}
export default function AddUpdatePackageCommission() {
  const { id } = useParams<{ id?: string }>();

  const gridRef = useRef(null);

  const [user, setUser] = useState<UserState>({
    page: 1,
    size: 100,
    search: '',
    data: []
  });

  useEffect(() => {
    if (id) {
      getPackageMarginService(user.page, user.size, id)
    }
  }, [user.page, user.size, id]);

  const getPackageMarginService = async (page: number, size: number, packageId: string) => {
    try {
      const res = await userService.GetPackageWiseMargins({ page, size, packageId });
      if (res?.success) {
        setUser((prev) => ({
          ...prev,
          data: res.data as UserRowData[]
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ag grig table 
  // Custom Input Renderer
  // const InputRenderer = (props: unknown) => {
  //   return (
  //     <input
  //       type="number"
  //       step="0.01"
  //       value={(props as any).value || 0}
  //       readOnly
  //       className="w-full px-2 py-1 border border-gray-300 rounded text-right"
  //     />
  //   );
  // };


  const columnDefs: ColDef[] = [
    { headerName: "S.No.", field: "id", width: 60, suppressSizeToFit: true },
    { headerName: "Operator Name", field: "operatorName", minWidth: 150 },

    // ✅ Numeric Input (default 0.00)
    {
      headerName: "P2P Commission",
      field: "p2PCommission",
      minWidth: 150,
      editable: true,
      valueParser: (params) => {
        const value = parseFloat(params.newValue);
        return isNaN(value) ? 0.0 : value;
      },
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        useFormatter: true,
      },
      valueFormatter: (params) => Number(params.value || 0).toFixed(2),
      // cellRenderer: InputRenderer,
    },

    {
      headerName: "P2A Commission",
      field: "p2ACommission",
      minWidth: 150,
      editable: true,
      valueParser: (params) => {
        const value = parseFloat(params.newValue);
        return isNaN(value) ? 0.0 : value;
      },
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        useFormatter: true,
      },
      valueFormatter: (params) => Number(params.value || 0).toFixed(2),
      // cellRenderer: InputRenderer,
    },

    { headerName: "Commission Type", field: "commissionType", minWidth: 150 },

    // ✅ Dropdown for Amount Type
    {
      headerName: "Amount Type",
      field: "amountType",
      minWidth: 150,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Flat", "Percentage"], // your dropdown values
      },

    },

    // ✅ Dropdown for Daily Limit
    {
      headerName: "Daily Limit",
      field: "dailyLimit",
      minWidth: 150,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["1000", "5000", "10000", "No Limit"], // example options
      },
    },
  ];

  const rowData = [
    {
      id: 1,
      operatorName: "Airtel",
      p2PCommission: 0.0,
      p2ACommission: 0.0,
      commissionType: "Distributor",
      amountType: "Flat",
      dailyLimit: "5000",
    },
    {
      id: 2,
      operatorName: "Jio",
      p2PCommission: 0.0,
      p2ACommission: 0.0,
      commissionType: "Retailer",
      amountType: "Percentage",
      dailyLimit: "10000",
    },
    {
      id: 3,
      operatorName: "Vodafone",
      p2PCommission: 0.0,
      p2ACommission: 0.0,
      commissionType: "Distributor",
      amountType: "Flat",
      dailyLimit: "No Limit",
    },
  ];
  return (
    <div className="p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-2">
          {/* Left: Filter + Search */}
          <div className="flex items-center gap-2">
            <div className="w-60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="h-8 text-sm pl-9 pr-3 bg-purple-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Export + Add */}
          <div className="flex items-center gap-2">
            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">Submit</Button>
          </div>
        </div>
        <div className="ag-theme-quartz w-full" style={{ height: '75vh' }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={rowData}
            rowHeight={40}
            headerHeight={35}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            singleClickEdit={true}
          />
        </div>
      </div>
    </div>
  )
}
