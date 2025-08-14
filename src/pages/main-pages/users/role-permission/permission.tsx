import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Checkbox } from "@/components/ui/checkbox"
// import { useNavigate } from "react-router-dom";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Permission() {
    // const navigate = useNavigate()
    const gridRef = useRef(null);



    // Custom Checkbox Renderer using ShadCN
    const checkboxRenderer = (props: ICellRendererParams<unknown>) => {
        const handleChange = (checked: boolean) => {
            props.setValue?.(checked); 
        };

        return (
            <div className="flex justify-center">
                <Checkbox
                    checked={props.value}
                    onCheckedChange={handleChange}
                    className={`rounded-md border border-orange-500 bg-white  data-[state=checked]:bg-orange-500  data-[state=checked]:text-white data-[state=checked]:border-transparent `}
                />
            </div>
        );
    };
    // ag grig table 
    const columnDefs: ColDef[] = [
        { headerName: "S.NO.", field: "id", width: 60, suppressSizeToFit: true },
        { headerName: "MENU NAME", field: "MenuName", flex: 2, minWidth: 180 },
        { headerName: "ALLOW MENU", field: "AllowMenu", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "CREATE", field: "Create", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "EDIT", field: "Edit", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "DELETE", field: "Delete", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },

    ];


    const rowData: Record<string, unknown>[] = [
        {
            id: 1,
            MenuName: "Dashboard",
            AllowMenu: true,
            Create: false,
            Edit: true,
            Delete: false,
        },
        {
            id: 2,
            MenuName: "User Management",
            AllowMenu: true,
            Create: true,
            Edit: false,
            Delete: true,
        },
    ];


    return (
        <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-2">
                    <h3 className="text-lg ml-4 font-semibold text-gray-800">Manage Permission (SuperAdmin)</h3>
                    <div className="flex items-center gap-2">
                        <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white" >Submit</Button>
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