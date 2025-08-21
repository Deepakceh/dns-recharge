import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getValidationSchema } from "@/utils/validation";
import * as Yup from "yup";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search } from "lucide-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import SelectField from "@/components/common/formFields/SelectField";
import { userService } from "@/api/user/services";
import { ToggleStatusIndicator } from "@/components/common/ToggleStatusIndicator";
import { showToast } from "@/utils/toast";
import { commonService } from "@/api/common/service";
import { AppDialog } from "@/components/common/AppDialog"
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface FormValues {
    roleId: string;
    notificationMsg: string;
    remark: string;
}

interface OptionType {
    id: number;
    name: string;
}

const validationSchema = Yup.object({
    roleId: getValidationSchema({ isRequired: true }),
    notificationMsg: getValidationSchema({ isRequired: true, minLength: 5, maxLength: 100 }),
    remark: getValidationSchema({ isRequired: true, minLength: 3, maxLength: 100 })
});

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

const UserNotification: React.FC = () => {
    const gridRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [id] = useState('0')
    const [roleData, setRoleData] = useState<OptionType[]>([]);
    const [user, setUser] = useState<UserState>({
        page: 1,
        size: 100,
        search: '',
        data: []
    });
    const [initialValues] = useState<FormValues>({
        roleId: '',
        notificationMsg: '',
        remark: ''
    });

    useEffect(() => {
        getRoleDropdownService()
        getUserNotificationListService(user.page, user.size);
    }, [user.page, user.size]);

    const getRoleDropdownService = async () => {
        try {
            const res = await commonService.GetRoles();
            if (res?.success) {
                const data = res.data as Array<{ id: number; name: string }>;
                setRoleData(data.map(({ id, name }) => ({ id, name })));
            }
        } catch (err) {
            console.error(err);
        }
    };
    //  api call for get notification list data
    const getUserNotificationListService = async (page: number, size: number) => {
        try {
            const res = await userService.GetNotificationBarData({ page: page, size: size });
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

    const handleSubmit = async (values: FormValues) => {
        //    setLoader(true)
        try {
            const res = await userService.AddUpdateNotificationBar({ ...values, id: id || undefined });
            //  setLoader(false)
            if (res?.success) {
                showToast.success(res.message || (id !== "0" ? "User updated successfully" : "User added successfully"));
                setOpen(false)
            } else {
                showToast.error(res?.message || "Failed");
            }
        } catch (err) {
            console.error(err);
            //  setLoader(false)
        }
    };

    // function for user update status & delete data
    const handleToggle = async (action: string, rowData: UserRowData) => {
        let payload: UserRowData;
        const status = !rowData.isActive;
        // Prepare payload based on action
        if (action === 'USER_NOTIFICATION_STATUS') {
            payload = { ...rowData, isActive: status };
        } else {
            payload = rowData; // For delete or other actions
        }
        try {
            const res = await commonService.CommonToggle(action, 'UpdateNotificationBarStatus', payload);
            if (res?.success) {
                showToast.success(res.message || 'Updated Successfully');

                setUser((prev) => {
                    let updatedData;

                    if (action === 'USER_NOTIFICATION_STATUS') {
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
                        <span title="Delete" onClick={() => handleToggle('USER_NOTIFICATION_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
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
                    <ToggleStatusIndicator isOn={!!value} onToggle={() => handleToggle('USER_NOTIFICATION_STATUS', data)} />
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
                        <Button type='button' onClick={() => setOpen(true)} className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
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

            <AppDialog
                open={open}
                onOpenChange={setOpen}
                title="Add Notification"
            >
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form
                            className="space-y-6"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.preventDefault()
                            }}
                        >
                            <div>
                                <SelectField name="roleId" label="Role" options={roleData} />
                                <div className="grid grid-cols-2 gap-4 mt-5">
                                    <div>
                                        <label className="text-sm font-medium">Notification Message</label>
                                        <Field as="textarea" name="notificationMsg" placeholder="Enter Message" className="border rounded-md w-full p-2" />
                                        <ErrorMessage name="notificationMsg" component="p" className="text-xs text-red-500" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Remark</label>
                                        <Field as="textarea" name="remark" placeholder="Enter Remark" className="border rounded-md w-full p-2" />
                                        <ErrorMessage name="remark" component="p" className="text-xs text-red-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
                                    Submit
                                </Button>
                                <Button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border border-red-400 text-red-500 rounded hover:bg-red-50">
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </AppDialog>

        </div>
    );
}

export default UserNotification;
