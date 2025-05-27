import { useSidebar } from "../ui/sidebar";
import vconnect_logo from "../../assets/images/vconnect/navbar-logo.png";
import atomberg_logo from "../../assets/images/atomberg/navbar-logo.png";
import { constants, getUserAllData } from "@/constants/index";
import { useNavigate } from "react-router-dom";
import { Menu, CircleUser, ChevronDown, LifeBuoy, LogOut, Settings, User, Lock, Moon, ShieldQuestion, } from "lucide-react"
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
} from "@/components/ui/dropdown-menu"
import { clearAllCookies } from "@/utils/cookieHandler";

export default function AuthNavbar() {
  const userData = getUserAllData()
  const navigate= useNavigate()
  const theme = constants.theme;
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    clearAllCookies();         // Remove all cookies
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between px-3 py-1 bg-[var(--navbar-bg)] text-[var(--navbar-content-color)] shadow-md">
      {/* Sidebar Toggle & Logo */}
      <div className="flex items-center gap-2 ml-4">
        <Menu className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105" onClick={toggleSidebar} />
        <img src={theme === "default" ? vconnect_logo : atomberg_logo} alt="logo" className="h-12 object-contain" />
      </div>

      {/* Profile Section with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 mr-4 cursor-pointer focus:outline-none">
          <CircleUser className="w-8 h-8" />
          <p className="text-lg">{userData?.UserName}</p>
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="w-56 bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-t border-gray-200 my-1" />
          <DropdownMenuItem className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
              <Settings />
              <span>Settings</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal >
              <DropdownMenuSubContent className='bg-white '>
                <DropdownMenuItem className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
                  <Moon />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
                  <Lock />
                  <span>Reset Password</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
            <LifeBuoy />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
            <ShieldQuestion />
            <span>FAQ's</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-t border-gray-200 my-1" />
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:font-semibold hover:bg-gray-100 cursor-pointer">
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
