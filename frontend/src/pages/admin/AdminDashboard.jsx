import React from "react";

import {
  Inbox,
  Clock,
  FolderOpen,
  CheckCircle,
  BarChart3,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import IncidentTable from "../../components/admin/IncidentTable";
import ActionCard from "../../components/admin/ActionCard";
import ReportsTrend from "../../components/admin/ReportsTrend";

const incidents = [
  {
    reference: "IR-2026-00047",
    type: "Property Damage",
    date: "15 Aug 2026",
    status: "New",
    priority: "High",
    assigned: "Unassigned",
  },
  {
    reference: "IR-2026-00042",
    type: "Lost Belongings",
    date: "14 Aug 2026",
    status: "Under Review",
    priority: "Low",
    assigned: "Sgt. M. Khumalo",
  },
  {
    reference: "IR-2026-00039",
    type: "Noise Nuisance",
    date: "14 Aug 2026",
    status: "Assigned",
    priority: "Medium",
    assigned: "Const. L. van der",
  },
  {
    reference: "IR-2026-00031",
    type: "Property Damage",
    date: "13 Aug 2026",
    status: "Resolved",
    priority: "Medium",
    assigned: "SAPS Case File #88",
  },
  {
    reference: "IR-2026-00028",
    type: "Minor Theft",
    date: "12 Aug 2026",
    status: "Resolved",
    priority: "High",
    assigned: "Cpt. N. Dlamini",
  },
];

const AdminDashboard = () => {

  const handleNavigation = (item) => {
    console.log("Navigate to:", item.path);
  };

  const handleIncidentClick = (incident) => {
    console.log("Selected incident:", incident);
  };

  const handleReviewReport = () => {
    console.log("Review next report");
  };

  const handleAssignedCases = () => {
    console.log("View assigned cases");
  };

  const handleAuditReport = () => {
    console.log("Generate audit report");
  };

  const actions = [
    {
      id: "review",
      label: "Review Next New Report",
      icon: CheckCircle,
      variant: "primary",
      onClick: handleReviewReport,
    },
    {
      id: "assigned",
      label: "View My Assigned Cases",
      icon: FolderOpen,
      onClick: handleAssignedCases,
    },
    {
      id: "audit",
      label: "Generate Audit Report",
      icon: BarChart3,
      onClick: handleAuditReport,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex text-slate-800">

      {/* Sidebar */}
      <AdminSidebar
        activeItem="Dashboard"
        onNavigate={handleNavigation}
      />

      {/* Main */}
      <main className="flex-1 min-w-0">

        <AdminHeader
          title="Officer Command Center"
          description="Summary status and active cases for SAPS community reporting framework"
        />

        <div className="p-5">

          {/* ============================================
              STATISTICS
          ============================================ */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">

            <StatCard
              title="New Reports Today"
              value="12"
              description="+3 since yesterday"
              icon={Inbox}
              iconColor="green"
            />

            <StatCard
              title="Under Review"
              value="34"
              description="Assigned for screening"
              icon={Clock}
              iconColor="blue"
            />

            <StatCard
              title="Active Cases"
              value="67"
              description="Under active investigation"
              icon={FolderOpen}
              iconColor="teal"
            />

            <StatCard
              title="Resolved This Month"
              value="23"
              description="Closed / SAPS logged"
              icon={CheckCircle}
              iconColor="green"
            />

          </div>

          {/* ============================================
              MAIN CONTENT
          ============================================ */}

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-4">

            {/* Incident Table */}
            <IncidentTable
              incidents={incidents}
              onViewAll={() => {
                console.log("View all incidents");
              }}
              onIncidentClick={handleIncidentClick}
            />

            {/* Right Side */}
            <div className="flex flex-col gap-4">

              <ActionCard
                title="Official Direct Actions"
                actions={actions}
              />

              <ReportsTrend
                title="Reports Intake Trend"
                period="Last 30 Days"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;