import { HelpCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AdminHeader() {
  const location = useLocation();

  const pageInfo = {
    "/admin": {
      title: "Admin Dashboard",
      subtitle: "Community incident administration and case management",
    },

    "/admin/assignments": {
      title: "Assignments",
      subtitle: "Assign incidents to authorized investigators",
    },

    "/admin/progress-updates": {
      title: "Record Case Progress",
      subtitle: "Authorized SAPS administrative updates and investigation history",
    },

    "/admin/cases": {
      title: "Cases",
      subtitle: "Review and manage reported incidents",
    },

    "/admin/evidence": {
      title: "Evidence",
      subtitle: "Manage evidence associated with active cases",
    },

    "/admin/reports": {
      title: "Reports",
      subtitle: "Review incident and case statistics",
    },

    "/admin/users": {
      title: "Users",
      subtitle: "Manage system users and access",
    },

    "/admin/audit-log": {
      title: "Audit Log",
      subtitle: "Review authorized system activity",
    },
  };

  const current =
    Object.entries(pageInfo).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] || pageInfo["/admin"];

  return (
    <header className="border-b border-slate-200 bg-white px-7 py-4">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {current.title}
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            {current.subtitle}
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100">
            <X size={13} />
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100">
            <HelpCircle size={13} />
          </button>

        </div>

      </div>

    </header>
  );
}