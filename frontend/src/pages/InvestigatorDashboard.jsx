
import { LogOut } from "lucide-react";
import axios from "axios";

const InvestigatorDashboard = () => {
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4">
        {/* LOGO / TITLE */}
        <div>
          <h1 className="text-xl font-bold">
            Investigator Dashboard
          </h1>

          <p className="text-sm text-slate-400">
            Incident Investigation System
          </p>
        </div>

        {/* LOGOUT */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={logout}
            title="Logout"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="size-5" />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-8">
        {/* WELCOME */}
        <div>
          <h2 className="text-3xl font-bold">
            Investigator Dashboard
          </h2>

          <p className="mt-2 text-slate-400">
            Welcome to the investigation dashboard.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {/* ASSIGNED CASES */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">
              Assigned Cases
            </h3>

            <p className="mt-2 text-3xl font-bold">
              12
            </p>
          </div>

          {/* INVESTIGATING */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">
              Investigating
            </h3>

            <p className="mt-2 text-3xl font-bold">
              7
            </p>
          </div>

          {/* COMPLETED */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">
              Completed
            </h3>

            <p className="mt-2 text-3xl font-bold">
              5
            </p>
          </div>
        </div>

        {/* CASES */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Investigation Cases
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Cases currently assigned to you.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {/* CASE 1 */}
            <div className="rounded-lg border border-slate-800 p-4 transition hover:bg-slate-800/50">
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                  <p className="font-medium">
                    Case #IR-1001
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Robbery — Johannesburg CBD
                  </p>
                </div>

                <span className="h-fit rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                  Investigating
                </span>
              </div>
            </div>

            {/* CASE 2 */}
            <div className="rounded-lg border border-slate-800 p-4 transition hover:bg-slate-800/50">
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                  <p className="font-medium">
                    Case #IR-1002
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Theft — Soweto
                  </p>
                </div>

                <span className="h-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  Assigned
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestigatorDashboard;
