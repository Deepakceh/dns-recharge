import { useState, useRef, useEffect } from "react";
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

const UserList: React.FC = () => {
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

  const status = [
    { id: 1, name: "ON" },
    { id: 2, name: "OFF" },
    { id: 3, name: "Lock" },
  ]

  useEffect(() => {
    getUserDropdwonService()
    getRoleDropdwonService()
    getUserListService(user.page, user.size);
  }, [user.page, user.size]);

  //  api call for get user dropdown data
  const getUserDropdwonService = async () => {
    try {
      const res = await commonService.UserDropdown();
      if (res?.success) {
        const data = res.data as Array<{ value: number; text: string }>;
        const user = data.map((user) => ({ id: user.value, name: user.text }));
        setUserData(user)
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleSubmit = (values: filterFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("filter Data:", values);
    resetForm();
  };

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
            <span title="Add" onClick={() => navigate('/users/wallet')}><SquarePlus className="text-indigo-400 cursor-pointer w-5 h-5" /></span>
            <span title="Delete" onClick={() => handleToggle('USER_DELETE', data)}><Trash2 className="text-indigo-500 cursor-pointer w-4 h-4" /></span>
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
          <ToggleStatusIndicator isOn={!!value} onToggle={() => handleToggle('USER_STATUS', data)} />
        );
      },
    },
    { headerName: "FULL NAME", field: "fullName", flex: 1 },
    { headerName: "ORG. NAME", field: "orgName", flex: 1 },
    { headerName: "P2P BALANCE", field: "p2PBalance", width: 140, suppressSizeToFit: true },
    { headerName: "P2A BALANCE", field: "p2ABalance", width: 140, suppressSizeToFit: true },
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
            <Link to='/users/list/add' >
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="!w-[600px] !max-w-none bg-white shadow-xl p-4">
          <SheetHeader>
            <SheetTitle>Search Panel</SheetTitle>
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
                    <SelectField name="user" label="User" options={userData} className="border" />
                    <SelectField name="role" label="Role" options={roleData} className="border" />
                    <SelectField name="status" label="Status" options={status} className="border" />
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

export default UserList;
