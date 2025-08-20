import {
  CircleUser,
  ChevronDown,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Lock,
  Moon,
  ShieldQuestion,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";
// import Cookies from "node_modules/@types/js-cookie";
export default function AuthNavbar() {
  const navigate = useNavigate()

  // const userData = JSON.parse(Cookies.get('userData') || '{}');

 const handleLogout = () => {
  // Remove specific cookies
  // Cookies.remove('token');
  // Cookies.remove('userData');

  // Clear other storage
  localStorage.clear();
  sessionStorage.clear();

  // Redirect to login page
  navigate('/login');
};

  return (
    <header className="sticky top-0 z-50 flex h-12 items-center justify-between gap-4 bg-white px-4 shadow-sm">
      {/* Left section: SidebarTrigger + Search */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <div className="w-72">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
            />
          </div>
        </div>
      </div>

      {/* Right section: User Profile Dropdown */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer focus:outline-none">
            <CircleUser className="w-8 h-8 text-gray-700" />
            <div className="flex flex-col items-start leading-tight">
              <p className="text-sm font-medium text-gray-800">Deepak Kumar</p>
              <p className="text-xs text-gray-400 -mt-1">Admin</p>
            </div>
            <div className="border border-gray-300 rounded-full">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-white shadow-lg mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-white">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                    <Lock className="w-4 h-4" />
                    <span>Reset Password</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <LifeBuoy className="w-4 h-4" />
              <span>Support</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <ShieldQuestion className="w-4 h-4" />
              <span>FAQ's</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-red-500">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
