import { useEffect, useState } from "react";
import axios from "axios";
import { Search, UserCheck } from "lucide-react";

const API = "http://localhost:3000/api/admin/investigators";

export default function Investigators() {
  const [investigators, setInvestigators] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedInvestigator, setSelectedInvestigator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestigators = async () => {
      try {
        const { data } = await axios.get(API, {
          withCredentials: true,
        });

        setInvestigators(data.investigators || []);
      } catch (error) {
        console.error("Error loading investigators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestigators();
  }, []);

  const filteredInvestigators = investigators.filter((investigator) =>
    `${investigator.fullName} ${investigator.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">
          Investigators
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          View and manage investigators available for case assignments.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search investigators..."
                className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700">
              <UserCheck size={16} />
              {investigators.length} Investigators
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-sm text-slate-400"
                    >
                      Loading investigators...
                    </td>
                  </tr>
                ) : filteredInvestigators.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-sm text-slate-400"
                    >
                      No investigators found.
                    </td>
                  </tr>
                ) : (
                  filteredInvestigators.map((investigator) => (
                    <tr
                      key={investigator._id}
                      onClick={() => setSelectedInvestigator(investigator)}
                      className="cursor-pointer hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-medium text-slate-800">
                        {investigator.fullName}
                      </td>

                      <td className="px-4 py-4 text-slate-500">
                        {investigator.email}
                      </td>

                      <td className="px-4 py-4 capitalize text-teal-600">
                        {investigator.role}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvestigator(investigator);
                          }}
                          className="font-medium text-teal-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-slate-800">
              Investigator Details
            </h2>

            {selectedInvestigator ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {selectedInvestigator.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm text-slate-600">
                    {selectedInvestigator.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Role</p>
                  <p className="text-sm font-semibold capitalize text-teal-600">
                    {selectedInvestigator.role}
                  </p>
                </div>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                Select an investigator to view their details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}