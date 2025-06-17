import { useState, useRef } from "react";
import { Formik, Form } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eye, Filter, Search } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet"
import InputField from "@/components/common/formFields/InputField";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface filterFormValues {
  accountNo: string;
  holderName: string;
  bankName: string;
}

export default function AccountList() {
  // const navigate = useNavigate()
  const gridRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("filter Data:", values);
    resetForm();
  };
  // ag grig table 
  const columnDefs: ColDef[] = [
    { headerName: "S.No.", field: "id", width: 60, suppressSizeToFit: true },
    {
      headerName: "ACTION",
      field: "action",
      width: 100,
      suppressSizeToFit: true,
      cellRenderer: () => (
        <div className="flex items-center gap-2 justify-center">
          <span title="Edit">
            <Pencil className="text-indigo-500 cursor-pointer w-4 h-4" />
          </span>
          <span title="View">
            <Eye className="text-indigo-500 cursor-pointer w-4 h-4" />
          </span>
        </div>
      ),
    },

    { headerName: "Display Name", field: "DisplayName", width: 150 },
    { headerName: "Bank/Branch Name", field: "BankBranchName", width: 180 },
    { headerName: "Branch Address", field: "BranchAddress", width: 180 },
    { headerName: "Account No.", field: "AccountNo", width: 140 },
    { headerName: "IFSC Code", field: "IFSC", width: 130 },
    { headerName: "Holder Name", field: "HolderName", width: 150 },
    { headerName: "UPI Address", field: "UPI", width: 130 },
    { headerName: "User", field: "User", width: 120 },
    { headerName: "Vendor", field: "Vendor", width: 120 },
    { headerName: "Remarks", field: "Remarks", width: 160 },
    { headerName: "Balance", field: "Balance", width: 120 },
    { headerName: "Min Limit", field: "MinLimit", width: 120 },
  ];

  const rowData: Record<string, unknown>[] = [
    {
      id: 1,
      DisplayName: "Pooja",
      BankBranchName: "Canara / Kolkata",
      BranchAddress: "Kolkata, India",
      AccountNo: "2810558116",
      IFSC: "CANA0A123",
      HolderName: "Pooja Kumar",
      UPI: "pooja@upi",
      User: "Vendor",
      Vendor: "Vendor C",
      Remarks: "New",
      Balance: 29643.94,
      MinLimit: 992.95,
    },
    {
      id: 2,
      DisplayName: "Sunil",
      BankBranchName: "Canara / Surat",
      BranchAddress: "Surat, India",
      AccountNo: "7937045777",
      IFSC: "CANA0T123",
      HolderName: "Sunil Kumar",
      UPI: "sunil@upi",
      User: "Vendor",
      Vendor: "Vendor A",
      Remarks: "Inactive",
      Balance: 47045.22,
      MinLimit: 807.13,
    },
    {
      id: 3,
      DisplayName: "Amit",
      BankBranchName: "Axis / Kolkata",
      BranchAddress: "Kolkata, India",
      AccountNo: "6623065588",
      IFSC: "AXIS0K123",
      HolderName: "Amit Kumar",
      UPI: "amit@upi",
      User: "Operator",
      Vendor: "Vendor D",
      Remarks: "New",
      Balance: 38317.18,
      MinLimit: 801.33,
    },
    {
      id: 4,
      DisplayName: "Neha",
      BankBranchName: "HDFC / Mumbai",
      BranchAddress: "Mumbai, India",
      AccountNo: "1986754321",
      IFSC: "HDFC0M987",
      HolderName: "Neha Verma",
      UPI: "neha@upi",
      User: "Admin",
      Vendor: "Vendor B",
      Remarks: "Updated",
      Balance: 22890.00,
      MinLimit: 600.00,
    },
    {
      id: 5,
      DisplayName: "Ravi",
      BankBranchName: "ICICI / Pune",
      BranchAddress: "Pune, India",
      AccountNo: "5432109876",
      IFSC: "ICIC0P543",
      HolderName: "Ravi Mehta",
      UPI: "ravi@upi",
      User: "User",
      Vendor: "Vendor A",
      Remarks: "Active",
      Balance: 51230.10,
      MinLimit: 750.00,
    },
    {
      id: 6,
      DisplayName: "Sneha",
      BankBranchName: "SBI / Lucknow",
      BranchAddress: "Lucknow, India",
      AccountNo: "1278654309",
      IFSC: "SBIN0L890",
      HolderName: "Sneha Singh",
      UPI: "sneha@upi",
      User: "Operator",
      Vendor: "Vendor C",
      Remarks: "Pending",
      Balance: 30450.75,
      MinLimit: 950.40,
    },
    {
      id: 7,
      DisplayName: "Rohit",
      BankBranchName: "PNB / Delhi",
      BranchAddress: "Delhi, India",
      AccountNo: "4587123690",
      IFSC: "PUNB0D450",
      HolderName: "Rohit Sharma",
      UPI: "rohit@upi",
      User: "Vendor",
      Vendor: "Vendor B",
      Remarks: "Verified",
      Balance: 40120.00,
      MinLimit: 820.00,
    },
    {
      id: 8,
      DisplayName: "Kiran",
      BankBranchName: "BOB / Jaipur",
      BranchAddress: "Jaipur, India",
      AccountNo: "8765432109",
      IFSC: "BARB0J789",
      HolderName: "Kiran Rao",
      UPI: "kiran@upi",
      User: "Admin",
      Vendor: "Vendor D",
      Remarks: "Rejected",
      Balance: 15000.55,
      MinLimit: 720.00,
    },
    {
      id: 9,
      DisplayName: "Deepak",
      BankBranchName: "Axis / Noida",
      BranchAddress: "Noida, India",
      AccountNo: "9081726354",
      IFSC: "AXIS0N908",
      HolderName: "Deepak Kumar",
      UPI: "deepak@upi",
      User: "User",
      Vendor: "Vendor A",
      Remarks: "Active",
      Balance: 27800.00,
      MinLimit: 680.00,
    },
    {
      id: 10,
      DisplayName: "Meena",
      BankBranchName: "ICICI / Hyderabad",
      BranchAddress: "Hyderabad, India",
      AccountNo: "7081263450",
      IFSC: "ICIC0H567",
      HolderName: "Meena Joshi",
      UPI: "meena@upi",
      User: "Vendor",
      Vendor: "Vendor C",
      Remarks: "Hold",
      Balance: 22345.45,
      MinLimit: 900.00,
    },
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
            <Link to='/bank/account-list/add' >
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
            <SheetTitle>Search Panel</SheetTitle>
          </SheetHeader>
          <div className="mt-5">
            <Formik
              initialValues={{
                accountNo: "",
                holderName: "",
                bankName: ""
              }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="accountNo" label="Account Number" type="text" placeholder="Enter account number" className="border" />
                    <InputField name="holderName" label="Holder Name" type="text" placeholder="Enter holder name" className="border" />
                    <InputField name="bankName" label="Bank Name" type="text" placeholder="Enter bank name" className="border" />
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