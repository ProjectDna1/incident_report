import { useEffect, useState } from "react";
import axios from "axios";
import {
  Inbox,
  Clock,
  FolderOpen,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatCard from "../../components/admin/StatCard";
import IncidentTable from "../../components/admin/IncidentTable";

const API = "http://localhost:3000/api/assignments";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get(API, {
          withCredentials: true,
        });

        setAssignments(data.assignments || []);
      } catch (error) {
        console.error(
          "Error fetching assignments:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const counts = {
    unassigned: assignments.filter((a) => a.status === "unassigned").length,
    assigned: assignments.filter((a) => a.status === "assigned").length,
    inProgress: assignments.filter((a) => a.status === "in_progress").length,
    completed: assignments.filter((a) => a.status === "completed").length,
  };

  const incidents = assignments.map((assignment) => ({
    id: assignment._id,
    reference: assignment.incident?.referenceNumber || "N/A",
    type: assignment.incident?.incidentType || "Unknown",
    date: assignment.createdAt
      ? new Date(assignment.createdAt).toLocaleDateString("en-ZA")
      : "N/A",
    status: assignment.status,
    priority: assignment.incident?.priority || "Medium",
    assigned: assignment.investigator?.fullName || "Unassigned",
  }));

  return (
    <div className="w-full">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900">
          Officer Command Center
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Manage community incident reports and investigations.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Unassigned"
          value={loading ? "..." : counts.unassigned}
          description="Waiting for investigator"
          icon={Inbox}
          iconColor="green"
        />

        <StatCard
          title="Assigned"
          value={loading ? "..." : counts.assigned}
          description="Assigned to investigators"
          icon={UserPlus}
          iconColor="blue"
        />

        <StatCard
          title="In Progress"
          value={loading ? "..." : counts.inProgress}
          description="Active investigations"
          icon={FolderOpen}
          iconColor="teal"
        />

        <StatCard
          title="Completed"
          value={loading ? "..." : counts.completed}
          description="Completed investigations"
          icon={CheckCircle}
          iconColor="green"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Incident Reports
            </h2>
            <p className="text-sm text-slate-500">
              Review and manage reported incidents.
            </p>
          </div>

          <Clock size={20} className="text-slate-400" />
        </div>

        <IncidentTable
          incidents={incidents}
          onViewAll={() => navigate("/admin/assignments")}
          onIncidentClick={() => navigate("/admin/assignments")}
        />
      </div>
    </div>
  );
}