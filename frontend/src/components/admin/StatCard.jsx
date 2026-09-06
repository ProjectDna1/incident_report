import React from "react";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "green",
}) => {
  const colors = {
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    teal: "bg-teal-50 text-teal-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4">

      <div className="flex items-center justify-between">

        <p className="text-[8px] font-bold text-slate-600">
          {title}
        </p>

        <div
          className={`
            w-6 h-6 rounded-full
            flex items-center justify-center
            ${colors[iconColor]}
          `}
        >
          {Icon && <Icon size={13} />}
        </div>

      </div>

      <h2 className="text-[22px] font-bold text-[#122b49] mt-2">
        {value}
      </h2>

      <p className="text-[7px] text-slate-400 mt-1">
        {description}
      </p>

    </div>
  );
};

export default StatCard;