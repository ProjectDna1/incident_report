import { Phone } from "lucide-react";

function CallButton({ number, label = "Call" }) {
  const handleCall = () => {
    window.location.href = `tel:${number}`;
  };

  return (
    <button
      onClick={handleCall}
      className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
    >
      <Phone size={20} />
      {label}
    </button>
  );
}

export default CallButton;