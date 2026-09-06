import { Phone, ShieldAlert } from "lucide-react";

function EmergencyCard() {
  const handleEmergencyCall = () => {
    const confirmed = window.confirm(
      "Do you want to call emergency services?"
    );

    if (!confirmed) return;

    window.location.href = "tel:10111";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Emergency Assistance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Need immediate assistance?
          </p>
        </div>

        <div className="rounded-full bg-red-100 p-3">
          <ShieldAlert
            size={24}
            className="text-red-600"
          />
        </div>

      </div>

      {/* Emergency Call Button */}
      <button
        onClick={handleEmergencyCall}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-5 py-4 font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
      >
        <Phone size={22} />

        Emergency Call
      </button>

      {/* Warning */}
      <div className="mt-4 rounded-lg bg-red-50 p-3">
        <p className="text-xs text-red-700">
          Only use emergency services when immediate assistance is required.
        </p>
      </div>

    </div>
  );
}

export default EmergencyCard;