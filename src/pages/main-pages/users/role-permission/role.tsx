import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, Settings, Trash2 } from "lucide-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import InputField from "@/components/common/formFields/InputField";
import { useNavigate } from "react-router-dom";
import { dropdownService } from "@/api/dropdown/service";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { userService } from "@/api/user/services";
import { showToast } from "@/utils/toast";
import { getValidationSchema } from "@/utils/validation";
import { AppDialog } from "@/components/common/AppDialog";
import { commonService } from "@/api/common/service";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface FormValues {
    id: number;
    roleName: string;
}
interface UserState {
    page: number;
    size: number;
    search: string;
    data: UserRowData[];
}
type UserRowData = {
    id: number;
    name: string;

};
const validationSchema = Yup.object({
    roleName: getValidationSchema({ isRequired: true }),
});

export default function Role() {
    const navigate = useNavigate()
    const gridRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [user, setUser] = useState<UserState>({
        page: 1,
        size: 100,
        search: '',
        data: []
    });
    const [initialValues, setInitialValues] = useState<FormValues>({
        id: 0,
        roleName: ''
    });

    useEffect(() => {
        getRoleService()
    }, [])

    const getRoleService = async () => {
        try {
            const res = await dropdownService.GetRoles();
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

    const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        try {
            const res = await userService.AddUpdateRole(values);
            if (res?.success) {
                resetForm()
                getRoleService();
                showToast.success(res.message || (values.id !== 0 ? "Updated successfully" : "Added successfully"));
                setOpen(false);
                // getRoleService()
            } else {
                showToast.error(res?.message || "");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (data: UserRowData) => {
        setOpen(true)
        const formData: FormValues = {
            id: data.id || 0,
            roleName: data.name?.toString() || ""
        };
        setInitialValues(formData);
    }

    const handleToggle = async (action: string, rowData: UserRowData) => {
        setLoader(true)
        try {
            const res = await commonService.CommonToggle(action, 'UpdateRoleStatus', rowData);
            if (res?.success) {
                setLoader(false)
                showToast.success(res.message || 'Deleted Successfully');
                setUser((prev) => ({
                    ...prev,
                    data: prev.data.filter((user) => user.id !== rowData.id),
                }))
            }
        } catch (err) {
            console.error("User API Error:", err);
            setLoader(false)
        }
    };

    // ag grig table 
    const columnDefs: ColDef[] = [
        { headerName: "S.No.", field: "id", width: 60, suppressSizeToFit: true },
        { headerName: "Role Name", field: "name", flex: 1, minWidth: 150 },
        {
            headerName: "ACTION",
            field: "action",
            width: 130,
            suppressSizeToFit: true, // fixed width
            cellRenderer: (params: ICellRendererParams<UserRowData>) => {
                const { data } = params;
                if (!data) return null;
                return (
                    <div className="flex items-center gap-2 justify-center">
                        <span title="Edit" onClick={() => handleEdit(data)}><Pencil className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                        <span title="Delete" onClick={() => handleToggle('ROLE_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                        <span title="Setting" onClick={() => navigate('/users/role/permission')}><Settings className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                    </div>
                )
            },
        }
    ];

    return (
        <>
            {loader && <CircleLoader />}
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
                            <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setOpen(true)}>ADD                       </Button>
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
                <AppDialog open={open} onOpenChange={setOpen} title="Add Role">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="relative grid md:grid-cols-2 gap-6">
                                    <InputField name="roleName" label="Role Name" type="text" placeholder="Enter role name" className="border" />
                                    <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                                        <ErrorMessage name="roleName" />
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
                </AppDialog >
            </div >
        </>
    );

}