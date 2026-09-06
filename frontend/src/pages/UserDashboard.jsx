import { useState } from "react";

import SouthAfricaBar from "../components/SouthAfricaBar";
import DashboardHeader from "../components/DashboardHeader";
import EmergencyCard from "../components/EmergencyCard";
import OnlineReportingCard from "../components/OnlineReportingCard";
import ProcessSteps from "../components/ProcessSteps";
import DashboardFooter from "../components/DashboardFooter";
import EmergencyModal from "../components/EmergencyModal";
import EmergencyContacts from "../components/EmergencyContacts";

function UserDashboard() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#10243e]">

      <SouthAfricaBar />

      <DashboardHeader />

      <main className="mx-auto max-w-[680px] px-3 pb-7 pt-7 sm:max-w-[950px] lg:max-w-[1170px] lg:px-8 lg:pt-8">

        {/* Title */}
        <section>
          <p className="mb-2 text-[6px] font-bold uppercase tracking-[0.5px] text-[#009b83] sm:text-[8px]">
            ELIGIBILITY & SAFETY CHECK
          </p>

          <h2 className="text-[21px] font-extrabold leading-tight tracking-[-0.6px] sm:text-[27px]">
            Report an Incident Online
          </h2>

          <p className="mt-2 max-w-[650px] text-[8px] leading-[1.55] text-[#536276] sm:text-[10px]">
            This secure portal is reserved for reporting minor, eligible
            non-emergency incidents within the Republic of South Africa.
            Correct path selection ensures resources are directed where they
            are most urgently needed.
          </p>
        </section>

        {/* Cards */}
        <section className="mt-6 grid gap-3 sm:mt-7 md:grid-cols-2 md:gap-4">

          <EmergencyCard
            onCall={() => setShowEmergencyModal(true)}
          />

          <OnlineReportingCard />

        </section>

        <ProcessSteps />

      </main>

      <DashboardFooter />

      <EmergencyModal
        open={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />

    </div>
  );
}

export default UserDashboard;