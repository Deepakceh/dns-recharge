import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, Settings } from "lucide-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import InputField from "@/components/common/formFields/InputField";
import { useNavigate } from "react-router-dom";
import CircleLoader from "@/components/common/loader/CircleLoader";
import { userService } from "@/api/user/services";
import { showToast } from "@/utils/toast";
import { getValidationSchema } from "@/utils/validation";
import { AppDialog } from "@/components/common/AppDialog";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface FormValues {
  id: number;
  packageName: string;
}
interface UserState {
  page: number;
  size: number;
  search: string;
  data: UserRowData[];
}
type UserRowData = {
  id: number;
  packageName: string;

};
const validationSchema = Yup.object({
  packageName: getValidationSchema({ isRequired: true }),
});

export default function PackageList() {
  const navigate = useNavigate()
  const gridRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [loader] = useState(false)
  const [user, setUser] = useState<UserState>({
    page: 1,
    size: 100,
    search: '',
    data: []
  });
  const [initialValues, setInitialValues] = useState<FormValues>({
    id: 0,
    packageName: ''
  });

  useEffect(() => {
    getPackageService(user.page, user.size)
  }, [user.page, user.size]);

  const getPackageService = async (page: number, size: number) => {
    try {
      const res = await userService.GetPackageData({ page, size });
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
      const res = await userService.AddUpdatePackage(values);
      if (res?.success) {
        resetForm()
        getPackageService(user.page, user.size);
        showToast.success(res.message || (values.id !== 0 ? "Updated successfully" : "Added successfully"));
        setOpen(false);
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
      packageName: data.packageName?.toString() || ""
    };
    setInitialValues(formData);
  }


  // ag grig table 
  const columnDefs: ColDef[] = [
    { headerName: "S.No.", field: "id", width: 60, suppressSizeToFit: true },
    { headerName: "Package Name", field: "packageName", flex: 1, minWidth: 150 },
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
            <span title="Setting" onClick={() => navigate(`/users/package-list/commission/${data.id}`)}><Settings className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
            <span title="Setting" onClick={() => navigate(`/users/package-list/slabMargin/${data.id}`)}><Settings className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
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
        <AppDialog open={open} onOpenChange={setOpen} title="Add Package">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="relative grid md:grid-cols-2 gap-6">
                  <InputField name="packageName" label="Package Name" type="text" placeholder="Enter package name" className="border" />
                  <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                    <ErrorMessage name="packageName" />
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