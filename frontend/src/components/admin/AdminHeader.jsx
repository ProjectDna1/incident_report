import React from "react";
import { HelpCircle, X } from "lucide-react";

const AdminHeader = ({
  title = "Officer Command Center",
  description = "Summary status and active cases for SAPS community reporting framework",
}) => {
  return (
    <header className="relative h-[74px] bg-white border-b border-slate-200 px-6 flex items-center justify-between">

      {/* Top government-style line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex">

        <div className="w-1/5 bg-red-600" />
        <div className="w-1/5 bg-emerald-600" />
        <div className="w-1/5 bg-blue-700" />
        <div className="w-1/5 bg-yellow-500" />
        <div className="w-1/5 bg-black" />

      </div>

      <div>
        <h1 className="text-[17px] font-bold text-[#122a49]">
          {title}
        </h1>

        <p className="text-[8px] text-slate-500 mt-1">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">

        <button className="w-7 h-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100">
          <X size={14} />
        </button>

        <button className="w-7 h-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100">
          <HelpCircle size={14} />
        </button>

      </div>

    </header>
  );
};

export default AdminHeader;