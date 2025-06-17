import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, Trash2, Settings } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);


export default function Role() {
    // const navigate = useNavigate()
    const gridRef = useRef(null);

    // ag grig table 
    const columnDefs: ColDef[] = [
        {
            headerName: "S.No.",
            field: "id",
            width: 60,
            suppressSizeToFit: true, // fixed width
        },
        {
            headerName: "ACTION",
            field: "action",
            width: 130,
            suppressSizeToFit: true, // fixed width
            cellRenderer: () => (
                <div className="flex items-center gap-2 justify-center">
                    <span title="Edit">
                        <Pencil className="text-indigo-500 cursor-pointer w-4 h-4" />
                    </span>
                    <span title="Delete">
                        <Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" />
                    </span>
                    <span title="Setting">
                        <Settings className="text-indigo-500 cursor-pointer w-4 h-4" />
                    </span>
                </div>
            ),
        },
        {
            headerName: "Role Name",
            field: "RoleName",
            flex: 1, // This makes it take all remaining space
            minWidth: 150, // Optional: minimum width
        },
    ];


    const rowData: Record<string, unknown>[] = [
        { id: 1, RoleName: "SuperAdmin" },
        { id: 2, RoleName: "Admin" },
        { id: 3, RoleName: "ApiUser" },
        { id: 4, RoleName: "ACCOUNTS DEPARTMENT" },
        { id: 5, RoleName: "Support Team" },
    ];


    return (
        <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-2">
                    {/* Left: Filter + Search */}
                    <div className="flex items-center gap-2">
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
                        <Link to='/users/account-list/add' >
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
                        rowData={rowData}
                        rowHeight={40}
                        headerHeight={35}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );

}