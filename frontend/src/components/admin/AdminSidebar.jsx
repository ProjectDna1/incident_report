import React from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  UserCheck,
  Activity,
  Shield,
  FolderOpen,
  BarChart3,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin-dashboard",
  },
  {
    name: "Intake Queue",
    icon: Inbox,
    path: "/admin/intake",
  },
  {
    name: "Cases",
    icon: FileText,
    path: "/admin/cases",
  },
  {
    name: "Assignments",
    icon: UserCheck,
    path: "/admin/assignments",
  },
  {
    name: "Progress Updates",
    icon: Activity,
    path: "/admin/progress",
  },
  {
    name: "Evidence",
    icon: FolderOpen,
    path: "/admin/evidence",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    name: "Audit Log",
    icon: Shield,
    path: "/admin/audit",
  },
];

const AdminSidebar = ({ activeItem = "Dashboard", onNavigate }) => {
  return (
    <aside className="w-[220px] min-h-screen bg-[#071b34] text-white flex flex-col shrink-0">

      {/* Branding */}
      <div className="h-[74px] px-4 flex items-center gap-2 border-b border-white/10">

        <div className="w-8 h-8 rounded-md border border-white/30 flex items-center justify-center">
          <Shield size={17} />
        </div>

        <div>
          <p className="text-[6px] text-emerald-400 font-bold tracking-wide">
            REPUBLIC OF SOUTH AFRICA
          </p>

          <h2 className="text-[9px] font-bold mt-0.5">
            Community Incident Portal
          </h2>
        </div>

      </div>

      {/* Profile */}
      <div className="px-4 py-4 border-b border-white/10 flex items-center gap-2">

        <div className="w-8 h-8 rounded-full bg-[#80654c] flex items-center justify-center text-[9px] font-bold">
          ND
        </div>

        <div>
          <p className="text-[9px] font-semibold">
            Cpt. N. Dlamini
          </p>

          <p className="text-[6px] text-emerald-400 font-bold mt-0.5">
            SUPERVISOR
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="px-2 py-3 flex flex-col gap-1">

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onNavigate?.(item)}
              className={`
                h-8 w-full rounded-md px-3
                flex items-center gap-3
                text-left text-[8px]
                transition
                ${
                  isActive
                    ? "bg-[#079e8d] text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon size={15} />

              <span>{item.name}</span>
            </button>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="mt-auto p-3">

        <div className="border border-slate-700 rounded-sm px-2 py-1.5 text-center">
          <span className="text-[5px] tracking-wider text-slate-500">
            OFFICIAL ADMIN PORTAL
          </span>
        </div>

      </div>

    </aside>
  );
};

export default AdminSidebar;