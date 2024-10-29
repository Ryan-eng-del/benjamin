"use client";

import Editor from "@/components/editor";
import { use } from "react";

export default function EditorPage({
  params,
}: {
  params: Promise<{ draft: string }>;
}) {
  const p = use(params);

  return (
    <div>
      <Editor draftId={p.draft} />
    </div>
  );
}
