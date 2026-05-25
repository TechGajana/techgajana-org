import React from "react";

interface Props {
  title: string;

  value: string | number;

  icon?: React.ReactNode;

  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl bg-gray-100 p-3">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}