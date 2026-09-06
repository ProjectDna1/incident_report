import { Shield, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


function DashboardHeader() {

const { logout, authUser, updateProfile } = useAuthStore();

  return (
    <header className="h-[35px] border-b border-[#e5e9ed] bg-white">
      <div className="mx-auto flex h-full max-w-[680px] items-center justify-between px-3 sm:max-w-[950px] lg:max-w-[1170px]">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-[4px] bg-[#eef3f7]">
            <Shield
              size={15}
              strokeWidth={1.8}
              className="text-[#10243e]"
            />
          </div>

          <div className="leading-none">
            <h1 className="text-[8px] font-bold text-[#10243e] sm:text-[10px]">
              Community Incident Reporting System
            </h1>

            <p className="mt-[2px] text-[5px] font-bold tracking-[0.3px] text-[#007a4d] sm:text-[6px]">
              REPUBLIC OF SOUTH AFRICA
            </p>
          </div>

        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-5">

          <Link
            to="/emergency-guide"
            className="text-[7px] font-bold text-[#009b83] sm:text-[9px]"
          >
            Emergency Guide
          </Link>

          <Link
            to="/new-report"
            className="text-[7px] font-medium text-[#111827] hover:text-[#009b83] sm:text-[9px]"
          >
            New Report
          </Link>

          <Link
            to="/track-status"
            className="text-[7px] font-medium text-[#111827] hover:text-[#009b83] sm:text-[9px]"
          >
            Track Status
          </Link>

          <span className="hidden rounded-[3px] border border-[#dfe5ea] bg-[#f6f8fa] px-2 py-[3px] text-[5px] font-bold tracking-[0.5px] text-[#526174] sm:block sm:text-[6px]">
            OFFICIAL PORTAL
          </span>

          {/* LOGOUT BUTTON */}
          <div className="flex gap-4 items-center">
            <button
             className="text-slate-400 hover:text-slate-200 transition-colors" 
             onClick={logout}
            >
              <LogOutIcon className="size-5" />
             </button>
          </div>
        </nav>

      </div>
    </header>
  );
}

export default DashboardHeader;