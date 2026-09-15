import TimelineItem from "./TimelineItem";

export default function CaseTimeline({ updates = [] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-slate-800">
          Authorized Case Timeline
        </h2>

        <p className="mt-1 text-[9px] text-slate-400">
          Investigation and administrative updates for this case.
        </p>
      </div>

      {/* EMPTY STATE */}
      {updates.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-xs font-medium text-slate-500">
            No progress updates
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            Updates recorded for this case will appear here.
          </p>
        </div>
      ) : (
        /* TIMELINE */
        <div className="space-y-3">
          {updates.map((update) => (
            <TimelineItem
              key={update._id}
              name={
                update.updatedBy?.fullName ||
                "Unknown User"
              }
              role={
                update.updatedBy?.role ||
                "USER"
              }
              date={
                update.createdAt
                  ? new Date(
                      update.createdAt
                    ).toLocaleString()
                  : "Unknown date"
              }
              text={update.text}
            />
          ))}
        </div>
      )}
    </section>
  );
}