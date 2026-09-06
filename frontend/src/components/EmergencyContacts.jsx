import { Phone, ShieldAlert, Ambulance, Flame } from "lucide-react";
import CallButton from "./CallButton";

function EmergencyContacts() {
  const contacts = [
    {
      name: "South African Police",
      number: "10111",
      icon: ShieldAlert,
      description: "Report a crime or request police assistance",
    },
    {
      name: "Ambulance",
      number: "10177",
      icon: Ambulance,
      description: "Request emergency medical assistance",
    },
    {
      name: "Fire Department",
      number: "10177",
      icon: Flame,
      description: "Request emergency fire assistance",
    },
  ];

  return (
    <div className="space-y-4">
      {contacts.map((contact) => {
        const Icon = contact.icon;

        return (
          <div
            key={contact.name}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-3">
                <Icon className="text-red-600" size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {contact.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {contact.description}
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {contact.number}
                </p>
              </div>
            </div>

            <CallButton
              number={contact.number}
              label="Call"
            />
          </div>
        );
      })}
    </div>
  );
}

export default EmergencyContacts;