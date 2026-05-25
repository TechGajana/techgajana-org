interface Props {
  seoTitle?: string;

  seoDescription?: string;
}

export default function SeoFields({
  seoTitle,
  seoDescription,
}: Props) {
  return (
    <div className="space-y-4 rounded-2xl border bg-gray-50 p-5">
      <div>
        <h2 className="text-lg font-semibold">
          SEO Settings
        </h2>

        <p className="text-sm text-gray-500">
          Optimize this page for search
          engines.
        </p>
      </div>

      <input
        type="text"
        name="seo_title"
        defaultValue={seoTitle}
        placeholder="SEO Title"
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="seo_description"
        defaultValue={seoDescription}
        placeholder="SEO Description"
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}