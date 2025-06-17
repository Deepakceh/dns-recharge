import { useState, useRef } from "react";
import { Formik, Form } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
// import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, SquarePlus, Filter, Search } from "lucide-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet"
import InputField from "@/components/common/formFields/InputField";
import SelectField from "@/components/common/formFields/SelectField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

type UserRowData = {
  id: number;
  name: string;
  orgName: string;
  p2pBalance: string;
  p2aBalance: string;
  status: "ON" | "OFF";
};

interface filterFormValues {
  mobile: string;
  email: string;
  user: string;
  role: string;
  status: string;
}

export default function UserList() {
  const navigate = useNavigate()
  const gridRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [dropdown] = useState({
    user: [
      { value: "", label: "Select" },
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
    ],
    role: [
      { value: "", label: "Select" },
      { value: "role1", label: "Role 1" },
      { value: "role2", label: "Role 2" },
    ],
    status: [
      { value: "", label: "Select" },
      { value: "on", label: "ON" },
      { value: "off", label: "OFF" },
    ],
  });

  const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("filter Data:", values);
    resetForm();
  };
  // ag grig table 
  const columnDefs: ColDef[] = [
    {
      headerName: "S.No.",
      field: "id",
      width: 60,
      suppressSizeToFit: true,
    },
    {
      headerName: "ACTION",
      field: "action",
      width: 130,
      suppressSizeToFit: true,
      cellRenderer: () => (
        <div className="flex items-center gap-2 justify-center">
          <span title="Edit"><Pencil className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
          <span title="Add" onClick={()=>navigate('/users/wallet')}><SquarePlus className="text-indigo-400 cursor-pointer w-5 h-5" /></span>
          <span title="Delete"><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
        </div>
      ),
    },
    {
      headerName: "STATUS",
      field: "status",
      width: 100,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams<UserRowData, string>) => {
        const isOn = params.value === "ON";
        return (
          <div
            className={`w-12 h-6 flex items-center justify-between px-1 rounded-full cursor-pointer text-xs font-medium relative
    ${isOn ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
          >
            <span className="z-10">{isOn ? "ON" : "OFF"}</span>
            <div
              className={`w-4 h-4 rounded-full bg-white shadow absolute top-1 left-1 transition-transform duration-200
      ${isOn ? "translate-x-6" : "translate-x-0"}`}
            />
          </div>

        );
      },
    }
    ,
    { headerName: "FULL NAME", field: "name", flex: 1 },
    { headerName: "ORG. NAME", field: "orgName", flex: 1 },
    {
      headerName: "P2P BALANCE",
      field: "p2pBalance",
      width: 140,
      suppressSizeToFit: true,
    },
    {
      headerName: "P2A BALANCE",
      field: "p2aBalance",
      width: 140,
      suppressSizeToFit: true,
    },
  ];


  const rowData: UserRowData[] = [
    { id: 1, name: "Edns Solutions Pvt Ltd", orgName: "DNS Pvt. Ltd.", p2pBalance: "1,987,464", p2aBalance: "746,843,747", status: "ON" },
    { id: 2, name: "SoftTech India Ltd", orgName: "ST Pvt. Ltd.", p2pBalance: "2,345,123", p2aBalance: "984,123,111", status: "OFF" },
    { id: 3, name: "Alpha Techno", orgName: "Alpha Pvt. Ltd.", p2pBalance: "3,456,789", p2aBalance: "123,456,789", status: "ON" },
    { id: 4, name: "Beta Corp", orgName: "Beta Pvt. Ltd.", p2pBalance: "5,678,123", p2aBalance: "234,567,891", status: "OFF" },
    { id: 5, name: "Gamma Innovations", orgName: "Gamma Pvt. Ltd.", p2pBalance: "9,123,456", p2aBalance: "345,678,912", status: "ON" },
    { id: 6, name: "Delta Services", orgName: "Delta Pvt. Ltd.", p2pBalance: "7,891,234", p2aBalance: "456,789,123", status: "OFF" },
    { id: 7, name: "Epsilon Tech", orgName: "Epsilon Pvt. Ltd.", p2pBalance: "4,567,891", p2aBalance: "567,891,234", status: "ON" },
    { id: 8, name: "Zeta Solutions", orgName: "Zeta Pvt. Ltd.", p2pBalance: "8,234,567", p2aBalance: "678,912,345", status: "OFF" },
    { id: 9, name: "Eta Enterprises", orgName: "Eta Pvt. Ltd.", p2pBalance: "6,789,123", p2aBalance: "789,123,456", status: "ON" },
    { id: 10, name: "Theta Labs", orgName: "Theta Pvt. Ltd.", p2pBalance: "2,345,678", p2aBalance: "891,234,567", status: "OFF" },
    { id: 11, name: "Iota Systems", orgName: "Iota Pvt. Ltd.", p2pBalance: "1,234,567", p2aBalance: "912,345,678", status: "ON" },
    { id: 12, name: "Kappa Technologies", orgName: "Kappa Pvt. Ltd.", p2pBalance: "9,876,543", p2aBalance: "123,456,789", status: "OFF" },
    { id: 13, name: "Lambda Corp", orgName: "Lambda Pvt. Ltd.", p2pBalance: "3,210,987", p2aBalance: "234,567,890", status: "ON" },
    { id: 14, name: "Mu Solutions", orgName: "Mu Pvt. Ltd.", p2pBalance: "7,654,321", p2aBalance: "345,678,901", status: "OFF" },
    { id: 15, name: "Nu Enterprises", orgName: "Nu Pvt. Ltd.", p2pBalance: "5,432,109", p2aBalance: "456,789,012", status: "ON" },
    { id: 16, name: "Xi Technologies", orgName: "Xi Pvt. Ltd.", p2pBalance: "8,765,432", p2aBalance: "567,890,123", status: "OFF" },
    { id: 17, name: "Omicron Tech", orgName: "Omicron Pvt. Ltd.", p2pBalance: "4,321,098", p2aBalance: "678,901,234", status: "ON" },
    { id: 18, name: "Pi Solutions", orgName: "Pi Pvt. Ltd.", p2pBalance: "6,543,210", p2aBalance: "789,012,345", status: "OFF" },
    { id: 19, name: "Rho Enterprises", orgName: "Rho Pvt. Ltd.", p2pBalance: "2,109,876", p2aBalance: "890,123,456", status: "ON" },
    { id: 20, name: "Sigma Technologies", orgName: "Sigma Pvt. Ltd.", p2pBalance: "9,876,543", p2aBalance: "901,234,567", status: "OFF" },
    { id: 21, name: "Tau Labs", orgName: "Tau Pvt. Ltd.", p2pBalance: "3,210,987", p2aBalance: "123,456,780", status: "ON" },
    { id: 22, name: "Upsilon Corp", orgName: "Upsilon Pvt. Ltd.", p2pBalance: "7,654,321", p2aBalance: "234,567,890", status: "OFF" },
    { id: 23, name: "Phi Solutions", orgName: "Phi Pvt. Ltd.", p2pBalance: "5,432,109", p2aBalance: "345,678,901", status: "ON" },
    { id: 24, name: "Chi Enterprises", orgName: "Chi Pvt. Ltd.", p2pBalance: "8,765,432", p2aBalance: "456,789,012", status: "OFF" },
    { id: 25, name: "Psi Technologies", orgName: "Psi Pvt. Ltd.", p2pBalance: "4,321,098", p2aBalance: "567,890,123", status: "ON" },
    { id: 26, name: "Omega Corp", orgName: "Omega Pvt. Ltd.", p2pBalance: "6,543,210", p2aBalance: "678,901,234", status: "OFF" },
    { id: 27, name: "Apex Solutions", orgName: "Apex Pvt. Ltd.", p2pBalance: "2,109,876", p2aBalance: "789,012,345", status: "ON" },
    { id: 28, name: "Beacon Enterprises", orgName: "Beacon Pvt. Ltd.", p2pBalance: "9,876,543", p2aBalance: "890,123,456", status: "OFF" },
    { id: 29, name: "Crest Technologies", orgName: "Crest Pvt. Ltd.", p2pBalance: "3,210,987", p2aBalance: "901,234,567", status: "ON" },
    { id: 30, name: "Dawn Labs", orgName: "Dawn Pvt. Ltd.", p2pBalance: "7,654,321", p2aBalance: "123,456,789", status: "OFF" },
    { id: 31, name: "Echo Solutions", orgName: "Echo Pvt. Ltd.", p2pBalance: "5,432,109", p2aBalance: "234,567,890", status: "ON" },
    { id: 32, name: "Falcon Enterprises", orgName: "Falcon Pvt. Ltd.", p2pBalance: "8,765,432", p2aBalance: "345,678,901", status: "OFF" },
    { id: 33, name: "Glory Technologies", orgName: "Glory Pvt. Ltd.", p2pBalance: "4,321,098", p2aBalance: "456,789,012", status: "ON" },
    { id: 34, name: "Horizon Corp", orgName: "Horizon Pvt. Ltd.", p2pBalance: "6,543,210", p2aBalance: "567,890,123", status: "OFF" },
    { id: 35, name: "Icon Labs", orgName: "Icon Pvt. Ltd.", p2pBalance: "2,109,876", p2aBalance: "678,901,234", status: "ON" },
    { id: 36, name: "Juno Solutions", orgName: "Juno Pvt. Ltd.", p2pBalance: "9,876,543", p2aBalance: "789,012,345", status: "OFF" },
    { id: 37, name: "Kite Enterprises", orgName: "Kite Pvt. Ltd.", p2pBalance: "3,210,987", p2aBalance: "890,123,456", status: "ON" },
    { id: 38, name: "Luna Technologies", orgName: "Luna Pvt. Ltd.", p2pBalance: "7,654,321", p2aBalance: "901,234,567", status: "OFF" },
    { id: 39, name: "Mira Labs", orgName: "Mira Pvt. Ltd.", p2pBalance: "5,432,109", p2aBalance: "123,456,789", status: "ON" },
    { id: 40, name: "Nexus Corp", orgName: "Nexus Pvt. Ltd.", p2pBalance: "8,765,432", p2aBalance: "234,567,890", status: "OFF" },
    { id: 41, name: "Orion Solutions", orgName: "Orion Pvt. Ltd.", p2pBalance: "4,321,098", p2aBalance: "345,678,901", status: "ON" },
    { id: 42, name: "Phoenix Enterprises", orgName: "Phoenix Pvt. Ltd.", p2pBalance: "6,543,210", p2aBalance: "456,789,012", status: "OFF" },
    { id: 43, name: "Quantum Technologies", orgName: "Quantum Pvt. Ltd.", p2pBalance: "2,109,876", p2aBalance: "567,890,123", status: "ON" },
    { id: 44, name: "Raven Labs", orgName: "Raven Pvt. Ltd.", p2pBalance: "9,876,543", p2aBalance: "678,901,234", status: "OFF" },
    { id: 45, name: "Solaris Corp", orgName: "Solaris Pvt. Ltd.", p2pBalance: "3,210,987", p2aBalance: "789,012,345", status: "ON" },
    { id: 46, name: "Titan Solutions", orgName: "Titan Pvt. Ltd.", p2pBalance: "7,654,321", p2aBalance: "890,123,456", status: "OFF" },
    { id: 47, name: "Umbra Enterprises", orgName: "Umbra Pvt. Ltd.", p2pBalance: "5,432,109", p2aBalance: "901,234,567", status: "ON" },
    { id: 48, name: "Vortex Technologies", orgName: "Vortex Pvt. Ltd.", p2pBalance: "8,765,432", p2aBalance: "123,456,789", status: "OFF" },
    { id: 49, name: "Waves Labs", orgName: "Waves Pvt. Ltd.", p2pBalance: "4,321,098", p2aBalance: "234,567,890", status: "ON" },
    { id: 50, name: "Xenon Corp", orgName: "Xenon Pvt. Ltd.", p2pBalance: "6,543,210", p2aBalance: "345,678,901", status: "OFF" },
  ];


  return (
    <div className="p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-2">
          {/* Left: Filter + Search */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="h-8 px-2 text-sm text-gray-500 border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition duration-200 flex items-center gap-1"
            >
              <span className="text-base"><Filter className="text-orange-500" /></span>
              Filter
            </Button>

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
            <Button
              variant="outline"
              className="h-8 px-3 text-sm border border-yellow-300 hover:bg-amber-200 bg-amber-100 text-yellow-600"
            >
              Export
            </Button>
            <Link to='/users/add' >
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="!w-[600px] !max-w-none bg-white shadow-xl p-4">
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <div className="mt-5">
            <Formik
              initialValues={{
                mobile: "",
                email: "",
                user: "",
                role: "",
                status: "",
              }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="mobile" label="Mobile" type="text" maxLength={10} placeholder="Enter Mobile" className="border" />
                    <InputField name="email" label="Email" type="email" placeholder="Enter Email" className="border" />
                    <SelectField name="user" label="User" options={dropdown.user} className="border" />
                    <SelectField name="role" label="Role" options={dropdown.role} className="border" />
                    <SelectField name="status" label="Status" options={dropdown.status} className="border" />
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Button type="submit" className="w-full bg-orange-500 text-white hover:brightness-90">Search</Button>
                    <Button type="button" onClick={() => setOpen(false)}
                      variant="outline" className="w-full border border-blue-900 text-blue-900 hover:bg-blue-50">Cancel</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

}