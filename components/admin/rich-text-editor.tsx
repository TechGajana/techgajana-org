"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] rounded-xl border p-4 outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleBold()
              .run()
          }
          className="rounded-lg border px-3 py-2"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className="rounded-lg border px-3 py-2"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
          className="rounded-lg border px-3 py-2"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className="rounded-lg border px-3 py-2"
        >
          List
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}