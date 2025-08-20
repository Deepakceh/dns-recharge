import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
// import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search } from "lucide-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { useNavigate } from "react-router-dom";
import { userService } from "@/api/user/services";
import { commonService } from "@/api/common/service";
import { ToggleStatusIndicator } from "@/components/common/ToggleStatusIndicator";
import { showToast } from "@/utils/toast";

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

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
};
interface UserState {
    page: number;
    size: number;
    search: string;
    data: UserRowData[];
}
interface filterFormValues {
    mobile: string;
    email: string;
    user: string;
    role: string;
    status: string;
}

const UserNotification: React.FC = () => {
    interface OptionType { id: number; name: string; }
    const navigate = useNavigate()
    const gridRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<OptionType[]>([]);
    const [roleData, setRoleData] = useState<OptionType[]>([]);
    const [user, setUser] = useState<UserState>({
        page: 1,
        size: 100,
        search: '',
        data: []
    });

    useEffect(() => {
        getRoleDropdwonService()
        getUserListService(user.page, user.size);
    }, [user.page, user.size]);


    //  api call for get role dropdown data
    const getRoleDropdwonService = async () => {
        try {
            const res = await commonService.GetRoles();
            if (res?.success) {
                console.log('get role', res)
                const data = res.data as Array<{ id: number; name: string }>;
                const role = data.map((role) => ({ id: role.id, name: role.name }));
                setRoleData(role);
            }
        } catch (err) {
            console.error(err);
        }
    };

    //  api call for get user list data
    const getUserListService = async (page: number, size: number) => {
        try {
            const res = await userService.GetUserList("GET_USER_LIST", { page: page, size: size });
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

    // const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    //     console.log("filter Data:", values);
    //     resetForm();
    // };

    // function for user update status & delete data
    const handleToggle = async (action: string, rowData: UserRowData) => {
        let payload: UserRowData;
        const status = !rowData.isActive;
        // Prepare payload based on action
        if (action === 'USER_STATUS') {
            payload = { ...rowData, isActive: status };
        } else {
            payload = rowData; // For delete or other actions
        }
        try {
            const res = await userService.UpdateUserStatus(action, payload);
            if (res?.success) {
                showToast.success(res.message || 'Updated Successfully');

                setUser((prev) => {
                    let updatedData;

                    if (action === 'USER_STATUS') {
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
        }
    };


    // ag grig table 
    const columnDefs: ColDef[] = [
        { headerName: "S.No.", field: "id", width: 60, suppressSizeToFit: true },
        {
            headerName: "ACTION",
            field: "action",
            width: 130,
            suppressSizeToFit: true,
            cellRenderer: (params: ICellRendererParams<UserRowData>) => {
                const { data } = params;
                if (!data) return null;
                return (
                    <div className="flex items-center gap-2 justify-center">
                        <span title="Edit"><Pencil className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                        <span title="Delete" onClick={() => handleToggle('USER_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                    </div>
                )
            },
        },
        { headerName: "ROLE", field: "role", flex: 1 },
        {
            headerName: "STATUS",
            field: "isActive",
            width: 100,
            suppressSizeToFit: true,
            cellRenderer: (params: ICellRendererParams<UserRowData, boolean>) => {
                const { value, data } = params;
                if (!data) return null;
                return (
                    <ToggleStatusIndicator isOn={!!value} onToggle={() => handleToggle('USER_STATUS', data)} />
                );
            },
        },
        { headerName: "MESSAGE", field: "orgName", flex: 1 },
        { headerName: "Remark", field: "", flex: 1 },
        { headerName: "CREATED DATE", field: "", flex: 1 },
        { headerName: "CREATED BY", field: "", flex: 1 },
        { headerName: "UPDATED DATE", field: "", flex: 1 },
        { headerName: "UPDATED BY", field: "", flex: 1 }
    ];


    return (
        <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-2">
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
                    <div className="flex items-center gap-2">
                        <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
                            ADD
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
        </div>
    );
}

export default UserNotification;
