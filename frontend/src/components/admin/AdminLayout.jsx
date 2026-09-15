import { Outlet, useLocation } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

export default function AdminLayout() {
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname.includes("/assignments")) {
      return "Assignments";
    }

    if (location.pathname.includes("/progress")) {
      return "Progress Updates";
    }

    if (location.pathname.includes("/cases")) {
      return "Cases";
    }

    if (location.pathname.includes("/evidence")) {
      return "Evidence";
    }

    if (location.pathname.includes("/reports")) {
      return "Reports";
    }

    if (location.pathname.includes("/users")) {
      return "Users";
    }

    if (location.pathname.includes("/audit")) {
      return "Audit Log";
    }

    if (location.pathname.includes("/intake")) {
      return "Intake Queue";
    }

    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar activeItem={getActiveItem()} />

      <main className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <section className="flex-1 p-6">
          <Outlet />
        </section>

        <AdminFooter />
      </main>
    </div>
  );
}