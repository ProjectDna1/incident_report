export default function TimelineItem({
  name = "Unknown User",
  role = "USER",
  date = "",
  text = "",
}) {
  return (
    <div className="relative rounded-lg border border-slate-100 bg-slate-50 p-4">
      
      {/* TOP */}
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">
            {name}
          </span>

          <span className="rounded bg-teal-600 px-2 py-0.5 text-[8px] font-bold uppercase text-white">
            {role}
          </span>
        </div>

        <span className="text-[9px] text-slate-400">
          {date}
        </span>
      </div>

      {/* UPDATE */}
      <p className="text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}