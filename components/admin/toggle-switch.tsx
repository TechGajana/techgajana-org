"use client";

interface Props {
  checked: boolean;

  onChange: (
    checked: boolean
  ) => void;

  label?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
}: Props) {
  return (
    <label className="flex items-center gap-3">
      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-7 w-14 rounded-full transition-all ${
          checked
            ? "bg-black"
            : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            checked
              ? "left-8"
              : "left-1"
          }`}
        />
      </button>

      {label && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </label>
  );
}