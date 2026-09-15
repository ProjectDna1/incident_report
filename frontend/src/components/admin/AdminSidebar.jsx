import { useNavigate } from "react-router-dom";
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
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Intake Queue", icon: Inbox, path: "/admin/intake" },
  { name: "Cases", icon: FileText, path: "/admin/cases" },
  { name: "Assignments", icon: UserCheck, path: "/admin/assignments" },
  { name: "Progress Updates", icon: Activity, path: "/admin/progress" },
  { name: "Evidence", icon: FolderOpen, path: "/admin/evidence" },
  { name: "Reports", icon: BarChart3, path: "/admin/reports" },
  { name: "Investigators", icon: UserCheck, path: "/admin/investigators" },
  { name: "Audit Log", icon: Shield, path: "/admin/audit" },
];

export default function AdminSidebar({ activeItem }) {
  const navigate = useNavigate();

  return (
    <aside className="flex min-h-screen w-[220px] shrink-0 flex-col bg-[#071b34] text-white">
      <div className="flex h-[74px] items-center gap-2 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/30">
          <Shield size={17} />
        </div>

        <div>
          <p className="text-[6px] font-bold tracking-wide text-emerald-400">
            REPUBLIC OF SOUTH AFRICA
          </p>
          <h2 className="text-[9px] font-bold">
            Community Incident Portal
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80654c] text-[9px] font-bold">
          ND
        </div>

        <div>
          <p className="text-[9px] font-semibold">Cpt. N. Dlamini</p>
          <p className="text-[6px] font-bold text-emerald-400">
            SUPERVISOR
          </p>
        </div>
      </div>

      <nav className="space-y-1 px-2 py-3">
        {navigation.map(({ name, icon: Icon, path }) => (
          <button
            key={name}
            type="button"
            onClick={() => navigate(path)}
            className={`flex h-8 w-full items-center gap-3 rounded-md px-3 text-left text-[8px] transition ${
              activeItem === name
                ? "bg-[#079e8d] text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={15} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-3">
        <div className="rounded-sm border border-slate-700 px-2 py-1.5 text-center">
          <span className="text-[5px] tracking-wider text-slate-500">
            OFFICIAL ADMIN PORTAL
          </span>
        </div>
      </div>
    </aside>
  );
}