import React from "react";
import { ChevronRight } from "lucide-react";

const IncidentTable = ({
  incidents = [],
  onViewAll,
  onIncidentClick,
}) => {

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-emerald-50 text-emerald-600 border-emerald-300";

      case "Under Review":
        return "bg-blue-50 text-blue-600 border-blue-300";

      case "Assigned":
        return "bg-orange-50 text-orange-600 border-orange-300";

      case "Resolved":
        return "bg-teal-50 text-teal-600 border-teal-300";

      default:
        return "bg-gray-50 text-gray-600 border-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";

      case "Medium":
        return "bg-orange-500";

      case "Low":
        return "bg-blue-500";

      default:
        return "bg-gray-400";
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-md overflow-hidden">

      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between">

        <h3 className="text-[10px] font-bold text-[#172e4c]">
          Recent Submissions
        </h3>

        <button
          onClick={onViewAll}
          className="text-[7px] text-emerald-600 flex items-center gap-1 hover:text-emerald-700"
        >
          View all
          <ChevronRight size={12} />
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Reference
              </th>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Type
              </th>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Date Received
              </th>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Status
              </th>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Priority
              </th>

              <th className="px-3 py-2 text-[7px] font-bold text-slate-500">
                Assigned To
              </th>

            </tr>

          </thead>

          <tbody>

            {incidents.length > 0 ? (

              incidents.map((incident) => (

                <tr
                  key={incident.reference}
                  onClick={() => onIncidentClick?.(incident)}
                  className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
                >

                  <td className="px-3 py-3 text-[7px] font-bold text-emerald-600">
                    {incident.reference}
                  </td>

                  <td className="px-3 py-3 text-[7px] text-slate-600">
                    {incident.type}
                  </td>

                  <td className="px-3 py-3 text-[7px] text-slate-500">
                    {incident.date}
                  </td>

                  <td className="px-3 py-3">

                    <span
                      className={`
                        inline-flex
                        px-2 py-0.5
                        rounded-sm
                        border
                        text-[6px]
                        font-bold
                        ${getStatusStyle(incident.status)}
                      `}
                    >
                      {incident.status}
                    </span>

                  </td>

                  <td className="px-3 py-3">

                    <span className="flex items-center gap-1.5 text-[7px] text-slate-600">

                      <span
                        className={`
                          w-1.5 h-1.5
                          rounded-full
                          ${getPriorityColor(incident.priority)}
                        `}
                      />

                      {incident.priority}

                    </span>

                  </td>

                  <td className="px-3 py-3 text-[7px] text-slate-600 max-w-[130px] truncate">
                    {incident.assigned}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-[8px] text-slate-400"
                >
                  No incidents found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default IncidentTable;