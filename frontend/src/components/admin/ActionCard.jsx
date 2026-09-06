import React from "react";
import { ChevronRight } from "lucide-react";

const ActionCard = ({
  title = "Official Direct Actions",
  actions = [],
}) => {
  return (
    <section className="bg-white border border-slate-200 rounded-md">

      <div className="px-4 h-12 flex items-center">

        <h3 className="text-[10px] font-bold text-[#172e4c]">
          {title}
        </h3>

      </div>

      <div className="px-4 pb-4 flex flex-col gap-2">

        {actions.map((action, index) => {

          const Icon = action.icon;

          const isPrimary =
            action.variant === "primary";

          return (
            <button
              key={action.id || index}
              onClick={action.onClick}
              className={`
                h-9 w-full rounded-md
                text-[7px]
                flex items-center gap-2 px-3
                transition

                ${
                  isPrimary
                    ? "bg-[#079e8d] text-white font-bold hover:bg-[#078f80]"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }
              `}
            >

              {Icon && <Icon size={13} />}

              <span>
                {action.label}
              </span>

              <ChevronRight
                size={13}
                className="ml-auto"
              />

            </button>
          );
        })}

      </div>

    </section>
  );
};

export default ActionCard;