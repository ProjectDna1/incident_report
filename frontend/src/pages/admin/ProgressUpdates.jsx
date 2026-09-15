import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CaseHeader from "../../components/admin/CaseHeader";
import CaseTimeline from "../../components/admin/CaseTimeline";
import CaseUpdateForm from "../../components/admin/CaseUpdateForm";

const API = "http://localhost:3000/api";

export default function ProgressUpdates() {
  const { incidentId } = useParams();

  const [incident, setIncident] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (incidentId) {
      loadCase();
    }
  }, [incidentId]);

  const loadCase = async () => {
    try {
      setLoading(true);

      const [incidentRes, updatesRes] =
        await Promise.all([
          axios.get(
            `${API}/incidents/${incidentId}`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${API}/case-updates/incident/${incidentId}`,
            {
              withCredentials: true,
            }
          ),
        ]);

      setIncident(
        incidentRes.data.incident ||
          incidentRes.data
      );

      setUpdates(
        updatesRes.data.updates || []
      );

    } catch (error) {
      console.error(
        "Error loading case:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setSubmitting(true);

      await axios.post(
        `${API}/case-updates`,
        {
          incidentId,
          ...data,
        },
        {
          withCredentials: true,
        }
      );

      await loadCase();

    } catch (error) {
      console.error(
        "Error submitting update:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit update"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading case...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">

      <CaseHeader
        caseNumber={
          incident?.caseNumber ||
          incident?._id
        }
        reportNumber={
          incident?.reportNumber ||
          incident?._id
        }
        status={
          incident?.status ||
          "UNDER INVESTIGATION"
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        <CaseTimeline
          updates={updates}
        />

        <CaseUpdateForm
          onSubmit={handleUpdate}
          loading={submitting}
        />

      </div>

    </div>
  );
}