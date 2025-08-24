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
import { configService } from "@/api/configuration/services";
import { showToast } from "@/utils/toast";
import { dropdownService } from "@/api/dropdown/service";
import { commonService } from "@/api/common/service";
import { AppDialog } from "@/components/common/AppDialog"
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface FormValues {
    id: number;
    // userId: string;
    callBackTypeId: string;
    url: string;
    remark: string;
}

interface OptionType {
    id: number;
    name: string;
}

const validationSchema = Yup.object({
    callBackTypeId: getValidationSchema({ isRequired: true }),
    url: getValidationSchema({ isRequired: true, type: "url", minLength: 5, maxLength: 100 }),
    remark: getValidationSchema({ isRequired: true, minLength: 3, maxLength: 100 })
});

type UserRowData = {
    id: number;
    callBackTypeId: string;
    url: string;
    fullName: string;
    notificationMsg: string;
    remark: string;
    isActive: boolean;

};
interface UserState {
    page: number;
    size: number;
    search: string;
    data: UserRowData[];
}

const Callback: React.FC = () => {
    const gridRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [callbackData, setCallbackData] = useState<OptionType[]>([]);
    const [user, setUser] = useState<UserState>({
        page: 1,
        size: 100,
        search: '',
        data: []
    });
    const [initialValues, setInitialValues] = useState<FormValues>({
        id: 0,
        callBackTypeId: '',
        url: '',
        remark: ''
    });

    useEffect(() => {
        getCallbackTypeDropdownService()
        getCallbackListService(user.page, user.size,);
    }, [user.page, user.size]);

    const getCallbackTypeDropdownService = async () => {
        try {
            const res = await dropdownService.CallBackType();
            if (res?.success) {
                const data = res.data as Array<{ id: number; typeName: string }>;
                const callback = data.map((callback) => ({ id: callback.id, name: callback.typeName }));
                setCallbackData(callback);

            }
        } catch (err) {
            console.error(err);
        }
    };

    //  api call for get notification list data
    const getCallbackListService = async (page: number, size: number) => {
        try {
            const res = await configService.GetCallBackURLData({ page: page, size: size });
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
        try {
            const res = await configService.AddUpdateCallBackURL(values);
            if (res?.success) {
                showToast.success(res.message || (values.id !== 0 ? "Updated successfully" : "Added successfully"));
                setOpen(false);
                getCallbackListService(user.page, user.size);
            } else {
                showToast.error(res?.message || "Failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // function for user update status & delete data
    const handleToggle = async (action: string, rowData: UserRowData) => {
        try {
            const res = await commonService.CommonToggle(action, 'DeleteCallBackURL', rowData);
            if (res?.success) {
                showToast.success(res.message || 'Updated Successfully');
                setUser((prev) => ({
                    ...prev,
                    data: prev.data.filter((user) => user.id !== rowData.id)
                }));
            }
        } catch (err) {
            console.error("User API Error:", err);
        }
    };

    const handleEdit = (data: UserRowData) => {
        setOpen(true)
        const formData: FormValues = {
            id: data.id || 0,
            callBackTypeId: data.callBackTypeId?.toString() || "",
            url: data.url || "",
            remark: data.remark || "",
        };
        setInitialValues(formData);
    }


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
                        <span title="Edit" onClick={() => handleEdit(data)}><Pencil className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                        <span title="Delete" onClick={() => handleToggle('CONFIG_CALLBACK_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
                    </div>
                )
            },
        },
        { headerName: "ORG. NAME", field: "orgName" },
        { headerName: "CALLBACK TYPE", field: "callBackType" },
        { headerName: "CALLBACK URL", field: "url", flex: 1 },
        { headerName: "REMARKS", field: "remark" }
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
                        <Button type='button' onClick={() => {
                            setInitialValues({
                                id: 0,
                                callBackTypeId: '',
                                url: '',
                                remark: ''
                            });
                            setOpen(true)
                        }} className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white">
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

            <AppDialog open={open} onOpenChange={setOpen} title="Add Call Back URL">
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
                                <SelectField name="callBackTypeId" label="CallBack Type" options={callbackData} />
                                <div className="grid grid-cols-2 gap-4 mt-5">
                                    <div>
                                        <label className="text-sm font-medium">Callback URL</label>
                                        <Field as="textarea" name="url" placeholder="Enter Message" className="border rounded-md w-full p-2" />
                                        <ErrorMessage name="url" component="p" className="text-xs text-red-500" />
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

export default Callback;
