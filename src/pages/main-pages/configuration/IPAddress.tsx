import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { getValidationSchema } from "@/utils/validation";
import * as Yup from "yup";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search } from "lucide-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { configService } from "@/api/configuration/services";
import { showToast } from "@/utils/toast";
import { commonService } from "@/api/common/service";
import { AppDialog } from "@/components/common/AppDialog"
import InputField from "@/components/common/formFields/InputField";
import { ToggleStatusIndicator } from "@/components/common/ToggleStatusIndicator";
import { authService } from "@/api/auth/services";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { OtpModal } from "@/components/common/OtpModal";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface FormValues {
    ipAddress: string
}

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

const validationSchema = Yup.object({
    ipAddress: getValidationSchema({ isRequired: true, type: "ip" })
});

const IPAddress: React.FC = () => {
    const gridRef = useRef(null);
    const [loader, setLoader] = useState(false)
    const [open, setOpen] = useState(false)
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<FormValues | null>(null);
    const [user, setUser] = useState<UserState>({
        page: 1,
        size: 100,
        search: '',
        data: []
    });

    useEffect(() => {
        getCallbackListService(user.page, user.size);
    }, [user.page, user.size]);

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

    const handleSubmit = async () => {
        try {
            const res = await authService.SendSignUpOTP('8859192935', 'deepakceh@gmail.com');
            setLoader(false);
            if (res?.success) {
                setShowOtp(true);
                showToast.success(res?.message || "OTP sent successfully");
            } else {
                showToast.error(res?.message || "Failed to send OTP");
            }
        } catch (err) {
            setLoader(false);
            console.error(err);
        }
    };

    // Handle OTP submission with IP address
    const handleOtpSubmit = async (otp: string) => {
        setLoader(true)
        try {
            if (!formValues) return;
            const res = await configService.AddRechargeIP({ ...formValues, otp });
            setLoader(false)
            if (res?.success) {
                setShowOtp(false);
                showToast.success(res?.message || "Added successful");
                setFormValues(null); // Clear formValues state as well
            } else {
                showToast.error(res?.message || "");
            }
        } catch (err) {
            setLoader(false)
            console.error(err);
        }
    };

    // function for user update status & delete data
    const handleToggle = async (action: string, rowData: UserRowData) => {
        let payload: UserRowData;
        const status = !rowData.isActive;
        // Prepare payload based on action
        if (action === 'CONFIG_IP_STATUS') {
            payload = { ...rowData, isActive: status };
        } else {
            payload = rowData; // For delete or other actions
        }
        try {
            const res = await commonService.CommonToggle(action, 'DeleteCallBackURL', payload);
            if (res?.success) {
                showToast.success(res.message || 'Updated Successfully');

                setUser((prev) => {
                    let updatedData;

                    if (action === 'CONFIG_IP_STATUS') {
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
                        <span title="Delete" onClick={() => handleToggle('CONFIG_IP_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
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
                    <ToggleStatusIndicator isOn={!!value} onToggle={() => handleToggle('`CONFIG_IP_STATUS`', data)} />
                );
            },
        },
        { headerName: "ORG. NAME", field: "orgName", flex: 1 },
        { headerName: "IP ADDRESS", field: "ipAddress", flex: 1 },
        { headerName: "UPDATED DATE & TIME", field: "updatedDate", flex: 1 }
    ];


    return (
        <>
            {loader && <CircleLoader />}
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

                <AppDialog open={open} onOpenChange={setOpen} title="Add Call Back URL">
                    <Formik
                        enableReinitialize
                        initialValues={{ ipAddress: '' }}
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
                                    <InputField name="ipAddress" label="IP Address" type="text" placeholder="Enter IP Address" className="border" />
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={loader}>
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
                <OtpModal
                    open={showOtp}
                    onClose={() => setShowOtp(false)}
                    onSubmit={handleOtpSubmit}
                    onResend={handleSubmit}
                    phoneOrEmail={'8859192935'}
                />
            </div>
        </>
    );
}

export default IPAddress;
