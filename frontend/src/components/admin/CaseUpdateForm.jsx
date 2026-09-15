import { useState } from "react";

const UPDATE_TYPES = [
  "Investigation Update",
  "Administrative Update",
  "Evidence Update",
  "Status Update",
  "Case Review",
];

export default function CaseUpdateForm({
  onSubmit,
  loading = false,
}) {
  const [updateType, setUpdateType] = useState(
    "Investigation Update"
  );

  const [text, setText] = useState("");
  const [publicView, setPublicView] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    await onSubmit({
      updateType,
      text: text.trim(),
      publicView,
    });

    setText("");
    setPublicView(false);
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-slate-800">
          Record Case Update
        </h2>

        <p className="mt-1 text-[9px] text-slate-400">
          Add an authorized update to the case history.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        
        {/* UPDATE TYPE */}
        <div>
          <label className="mb-1.5 block text-[10px] font-semibold text-slate-600">
            Update Type
          </label>

          <select
            value={updateType}
            onChange={(event) =>
              setUpdateType(event.target.value)
            }
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-teal-500"
          >
            {UPDATE_TYPES.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* UPDATE TEXT */}
        <div>
          <label className="mb-1.5 block text-[10px] font-semibold text-slate-600">
            Progress Update
          </label>

          <textarea
            value={text}
            onChange={(event) =>
              setText(event.target.value)
            }
            placeholder="Enter the progress made on this case..."
            rows={8}
            className="w-full resize-none rounded-md border border-slate-200 px-3 py-2.5 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500"
          />

          <p className="mt-1 text-right text-[8px] text-slate-400">
            {text.length} characters
          </p>
        </div>

        {/* PUBLIC VIEW */}
        <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={publicView}
              onChange={(event) =>
                setPublicView(event.target.checked)
              }
              className="mt-0.5 h-4 w-4 accent-teal-600"
            />

            <div>
              <p className="text-[10px] font-semibold text-slate-700">
                Approved for Public View
              </p>

              <p className="mt-1 text-[8px] leading-4 text-slate-400">
                Only enable this when the update is safe
                and approved to be shown to the reporting
                user.
              </p>
            </div>
          </label>
        </div>

        {/* WARNING */}
        <div className="rounded-md border border-amber-100 bg-amber-50 p-3">
          <p className="text-[9px] leading-4 text-amber-700">
            Do not include confidential investigation
            information unless it is authorized for this
            case update.
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full rounded-md bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving Update..."
            : "Save Case Update"}
        </button>
      </form>
    </section>
  );
}