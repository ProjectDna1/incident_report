import React from "react";

const ReportsTrend = ({
  title = "Reports Intake Trend",
  period = "Last 30 Days",
  points = "10,110 60,96 110,115 160,55 210,74 260,35 315,48 365,20",
}) => {
  return (
    <section className="bg-white border border-slate-200 rounded-md p-4">

      <div className="flex items-center justify-between mb-3">

        <h3 className="text-[9px] font-bold text-[#172e4c]">
          {title}
        </h3>

        <span className="text-[6px] text-slate-400">
          {period}
        </span>

      </div>

      <div className="relative h-[105px] bg-slate-50 rounded-md overflow-hidden">

        {/* Grid */}
        <div className="absolute top-[25%] left-2 right-2 border-t border-slate-200" />

        <div className="absolute top-[50%] left-2 right-2 border-t border-slate-200" />

        <div className="absolute top-[75%] left-2 right-2 border-t border-slate-200" />

        {/* Line */}
        <svg
          viewBox="0 0 400 150"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-[#079e8d]"
        >

          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

        </svg>

      </div>

    </section>
  );
};

export default ReportsTrend;