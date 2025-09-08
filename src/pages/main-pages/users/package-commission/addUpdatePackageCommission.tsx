import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { userService } from "@/api/user/services";
import { useParams } from "react-router-dom";
ModuleRegistry.registerModules([AllCommunityModule]);

type UserRowData = {
  id: number;
  operatorName: string;
  p2PCommission: number;
  p2ACommission: number;
  commissionType: string;
  amountType: string;
  dailyLimit: string;
};

interface UserState {
  page: number;
  size: number;
  search: string;
  data: UserRowData[];
}

export default function AddUpdatePackageCommission() {
  const { id } = useParams<{ id?: string }>();
  const gridRef = useRef<AgGridReact<UserRowData>>(null);

  const [user, setUser] = useState<UserState>({
    page: 1,
    size: 100,
    search: "",
    data: [],
  });

  useEffect(() => {
    if (id) {
      getPackageMarginService(user.page, user.size, id);
    }
  }, [user.page, user.size, id]);

  const getPackageMarginService = async (page: number, size: number, packageId: string) => {
    try {
      const res = await userService.GetPackageWiseMargins({ page, size, packageId });
      if (res?.success) {
        setUser((prev) => ({
          ...prev,
          data: res.data as UserRowData[],
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Custom Input Renderer
  const InputRenderer = (props: any) => {
    return (
      <input
        type="number"
        step="0.01"
        value={props.value || 0}
        onChange={(e) => props.setValue(Number(e.target.value))}
        className="w-full px-2 py-1 border border-gray-300 rounded text-right text-sm"
      />
    );
  };

  // ✅ Custom Select Renderer
  const SelectRenderer = (props: any) => {
    const options = props.options || [];
    return (
      <select
        value={props.value || ""}
        onChange={(e) => props.setValue(e.target.value)}
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
      >
        {options.map((opt: string, i: number) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };

  const columnDefs: ColDef<UserRowData>[] = [
    { headerName: "S.No.", field: "id", width: 80 },
    { headerName: "Operator Name", field: "operatorName", width: 130 },

    {
      headerName: "P2P Commission",
      field: "p2PCommission", width: 150,
      cellRenderer: InputRenderer,
    },
    {
      headerName: "P2A Commission",
      field: "p2ACommission", width: 140,
      cellRenderer: InputRenderer,
    },

    {
      headerName: "Commission Type",
      field: "amountType", width: 190, flex: 1,
      cellRenderer: (params: any) => (
        <SelectRenderer {...params} options={["Flat", "Percentage"]} />
      ),
    },
    {
      headerName: "Amount Type",
      field: "amountType", width: 190, flex: 1,
      cellRenderer: (params: any) => (
        <SelectRenderer {...params} options={["Flat", "Percentage"]} />
      ),
    },
    {
      headerName: "Daily Limit",
      field: "dailyLimit", width: 140,
      cellRenderer: InputRenderer,
    },
  ];

  const rowData: UserRowData[] = [
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
        {/* Top Bar */}
        <div className="flex items-center justify-between p-2">
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

          <div className="flex items-center gap-2">
            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
              Submit
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="ag-theme-quartz w-full" style={{ height: "75vh" }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={rowData}
            rowHeight={45}
            headerHeight={40}
            defaultColDef={{
              resizable: true,
            }}
            suppressCellFocus={true}
          />
        </div>
      </div>
    </div>
  );
}
