import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, UserRound, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api/assignments";

export default function AssignmentHub() {
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

  const unassigned = assignments.filter(
    (item) => item.status === "unassigned"
  );

  const inProgress = assignments.filter(
    (item) => item.status === "in_progress"
  );

  const pendingReview = assignments.filter(
    (item) => item.status === "pending_review"
  );

  const handleAssign = (assignmentId) => {
    navigate(`/admin/assignments/${assignmentId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading assignments...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* TITLE */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900">
          Officer Assignment Hub
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Manage incident assignments and investigator workload.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Total" value={assignments.length} />
        <Stat label="Unassigned" value={unassigned.length} />
        <Stat label="In Progress" value={inProgress.length} />
        <Stat label="Pending Review" value={pendingReview.length} />
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssignmentColumn
          title="Unassigned"
          count={unassigned.length}
          items={unassigned}
          onAssign={handleAssign}
        />

        <AssignmentColumn
          title="In Progress"
          count={inProgress.length}
          items={inProgress}
          onAssign={handleAssign}
        />

        <AssignmentColumn
          title="Pending Review"
          count={pendingReview.length}
          items={pendingReview}
          onAssign={handleAssign}
        />
      </div>
    </div>
  );
}

/* STAT */

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-semibold uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* COLUMN */

function AssignmentColumn({
  title,
  count,
  items,
  onAssign,
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">
          {title}
        </h2>

        <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] font-bold text-slate-600">
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-xs text-slate-400">
              No assignments
            </p>
          </div>
        ) : (
          items.map((item) => (
            <AssignmentCard
              key={item._id}
              item={item}
              onAssign={onAssign}
            />
          ))
        )}
      </div>
    </section>
  );
}

/* CARD */

function AssignmentCard({ item, onAssign }) {
  const incident = item.incident;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-teal-600">
          {incident?.referenceNumber || "N/A"}
        </span>

        <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
          {incident?.priority || "Medium"}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-bold text-slate-800">
        {incident?.incidentType || "Incident"}
      </h3>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock size={13} />
          {item.daysOpen || 0} Days open
        </span>

        {item.investigator ? (
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <UserRound size={13} />
            {item.investigator.fullName}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onAssign(item._id)}
            className="flex items-center gap-1 rounded-md bg-[#071b32] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0b294b]"
          >
            <UserPlus size={13} />
            Assign
          </button>
        )}
      </div>
    </div>
  );
}