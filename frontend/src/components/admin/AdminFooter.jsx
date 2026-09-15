export default function AdminFooter() {
  return (
    <footer className="bg-[#071d35] px-7 py-4 text-slate-400">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-[9px] font-bold text-white">
            Community Incident Reporting System
          </p>

          <p className="mt-1 text-[8px]">
            Fictional Government Public Service Training Scenario
          </p>
        </div>

        <div className="text-[8px]">
          SAPS:
          <span className="text-white"> 10111</span>

          <span className="mx-4">
            Ambulance:
            <span className="text-white"> 10177</span>
          </span>

          Liaison:
          <span className="text-white"> 012-555-0199</span>
        </div>

      </div>

      <p className="mt-3 text-[7px] leading-4 text-slate-500">
        This application is a simulated fictional public service
        platform designed for training and demonstration purposes.
      </p>

    </footer>
  );
}