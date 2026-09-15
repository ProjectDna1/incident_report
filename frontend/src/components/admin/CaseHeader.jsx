export default function CaseHeader({
  caseNumber,
  reportNumber,
  status,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      
      {/* CASE INFORMATION */}
      <div className="flex items-center gap-5">
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase text-slate-400">
            Case Number
          </p>

          <span className="rounded-md bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-600">
            {caseNumber || "N/A"}
          </span>
        </div>

        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase text-slate-400">
            Linked Report
          </p>

          <span className="text-xs font-semibold text-teal-600">
            {reportNumber || "N/A"}
          </span>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium text-slate-400">
          Current Status:
        </span>

        <span className="rounded-md bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase text-amber-600">
          {status || "UNDER INVESTIGATION"}
        </span>
      </div>
    </div>
  );
}