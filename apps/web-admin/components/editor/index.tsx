"use client";

import { useEditorStore } from "@/providers/editorProvider";
import { Button } from "@benjamin/ui";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface EditorProps {
  draftId?: string;
  content: OutputData | undefined;
}
export default function Editor({ draftId, content }: EditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { updateTitle, title } = useEditorStore((state) => state);
  const ref = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        data: content,
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [content]);

  useEffect(() => {
    initializeEditor();
    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [initializeEditor]);

  // 保存草稿
  const handleSave = async () => {
    setIsSaving(true);
    const data = await ref.current?.save();

    if (draftId) {
      console.log(draftId, "draftId");
      console.log(data, "content");
      console.log(title, "title");
    }
    setIsSaving(false);
  };

  //  草稿模式下发布文章
  // const handlePublish = async () => {
  //   setIsSaving(true);
  //   const data = await ref.current?.save();

  //   if (draftId) {
  //     console.log(draftId, "draftId");
  //     console.log(data, "content");
  //     console.log(title, "title");
  //   }
  //   setIsSaving(false);
  // };

  return (
    <div className="grid w-full gap-10">
      <div className="flex w-auto items-center justify-between">
        <div className="flex items-center space-x-10">
          <Button>
            <>
              <ArrowLeftIcon />
              Back
            </>
          </Button>
          <p className="text-sm text-muted-foreground">
            {0 ? "Published" : "Draft"}
          </p>
        </div>
        <Button onClick={handleSave}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>Save</span>
        </Button>
      </div>
      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <TextareaAutosize
          title={title}
          autoFocus
          id="title"
          defaultValue={"假如旷野是假象"}
          placeholder="Post title"
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl font-bold focus:outline-none"
        />
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Input{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            /
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </div>
  );
}
