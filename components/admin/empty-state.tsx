interface Props {
  title: string;

  description?: string;

  button?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  button,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-6 py-20 text-center">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-gray-500">
          {description}
        </p>
      )}

      {button && (
        <div className="mt-6">
          {button}
        </div>
      )}
    </div>
  );
}