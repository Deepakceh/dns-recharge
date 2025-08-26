import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, Trash2, Settings } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/formFields/InputField";
import { Separator } from "@/components/ui/separator";
// import { useNavigate } from "react-router-dom";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface formValues {
  packageName: string;
}

const formSchema = Yup.object().shape({
  packageName: Yup.string().required("Required package name"),
});
export default function PackageList() {
  // const navigate = useNavigate()
  const gridRef = useRef(null);
  const [open, setOpen] = useState(false);


  const handleSubmit = (values: formValues, { resetForm }: { resetForm: () => void }) => {
    console.log("package name", values);
    resetForm();
  };

  // ag grig table 
  const columnDefs: ColDef[] = [
    { headerName: "S.NO.", field: "id", width: 60, suppressSizeToFit: true },
    { headerName: "PACKAGE NAME", field: "PackageName", width: 120, flex: 1 },
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
          <span title="Setting">
            <Settings className="text-indigo-500 cursor-pointer w-4 h-4" />
          </span>
          <span title="Delete">
            <Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" />
          </span>
        </div>
      ),
    }
  ];

  const rowData: Record<string, unknown>[] = [
    { id: 1, PackageName: 'Offline Base Pack', Mode: 'Offline' },
    { id: 2, PackageName: 'Online Base PAck', Mode: 'Online' },
    { id: 3, PackageName: 'Special Package', Mode: 'Online' },
    { id: 4, PackageName: 'BBPS Package', Mode: 'BBPS' },
    { id: 5, PackageName: 'BBPS Package', Mode: 'BBPS' },
    { id: 6, PackageName: 'Offline Base Pack', Mode: 'Offline' },
    { id: 2, PackageName: 'Online Base PAck', Mode: 'Online' },
    { id: 3, PackageName: 'Special Package', Mode: 'Online' },
    { id: 9, PackageName: 'Online Base PAck', Mode: 'Online' },
    { id: 10, PackageName: 'Special Package', Mode: 'Online' },

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
              <Button className="h-8 px-5 text-sm bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setOpen(true)}>
                ADD
              </Button>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800 space-y-1 text-left" >Add Package</DialogTitle>
            <Separator className="my-0 bg-gray-200" />
          </DialogHeader>
          <div className="mt-0">
            <Formik
              initialValues={{
                packageName: ''
              }}
              validationSchema={formSchema}
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

                  <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 mt-6">
                    <Button type="submit" className="h-8 px-5 bg-orange-500 text-white hover:brightness-90">Submit</Button>
                    <Button type="button" onClick={() => setOpen(false)}
                      variant="outline" className="h-8 px-5 border border-blue-900 text-blue-900 hover:bg-blue-50">Cancel</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

}