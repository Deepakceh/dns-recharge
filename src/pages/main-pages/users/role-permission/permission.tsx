import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate, useParams } from "react-router-dom";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { userService } from "@/api/user/services";
import { showToast } from "@/utils/toast";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface UserState {
    search: string;
    data: UserRowData[];
}
type UserRowData = {
    id: number;
    name: string;
    menuId: number;
    canView?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
};
export default function Permission() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const gridRef = useRef(null);
    const [loader, setLoader] = useState(false)
    const [user, setUser] = useState<UserState>({
        search: '',
        data: []
    });

    useEffect(() => {
        if (id) {
            getMenuForRolePermissionsService(id);
        }
    }, [id]);

    const getMenuForRolePermissionsService = async (id: string) => {
        setLoader(true)
        try {
            const res = await userService.GetMenuForRolePermissions({ roleId: id });
            setLoader(false);
            if (res?.success) {
                setUser((prev) => ({
                    ...prev,
                    data: res.data as UserRowData[]
                }));
            }
        } catch (err) {
            console.error(err);
            setLoader(false)
        }
    };

    const handleRolePermission = async () => {
        const permissionsOnly = user.data.map(item => ({
            menuId: item.menuId,
            canView: item.canView,
            canCreate: item.canCreate,
            canUpdate: item.canUpdate,
            canDelete: item.canDelete
        }));
        setLoader(true);
        try {
            const res = await userService.SetMenuPermissions({ roleId: id, permissions: permissionsOnly });
            setLoader(false);
            if (res?.success) {
                showToast.success(res.message || "User updated successfully");
                setTimeout(() => navigate("/users/role"), 2000);
            } else {
                showToast.error(res?.message || "Failed");
            }
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    }

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
    // ag grid table 
    const columnDefs: ColDef[] = [
        { headerName: "S.NO.", width: 60, suppressSizeToFit: true, cellStyle: { textAlign: "center" }, valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1 },
        { headerName: "MENU NAME", field: "name", flex: 2, minWidth: 180 },
        { headerName: "ALLOW MENU", field: "canView", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "CREATE", field: "canCreate", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "EDIT", field: "canUpdate", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },
        { headerName: "DELETE", field: "canDelete", flex: 1, minWidth: 80, cellRenderer: checkboxRenderer },

    ];


    return (
        <>
            {loader && <CircleLoader />}
            <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <div className="flex items-center justify-between p-2">
                        <h3 className="text-lg ml-4 font-semibold text-gray-800">Manage Permission (SuperAdmin)</h3>
                        <div className="flex items-center gap-2">
                            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white" onClick={handleRolePermission}>Submit</Button>
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
            </div>
        </>
    );

}