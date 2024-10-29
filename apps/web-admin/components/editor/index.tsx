"use client";

import { useEditorStore } from "@/providers/editorProvider";
import { useGetDraftDetail, useUpdateDraftDetail } from "@/server/post";
import { Button } from "@benjamin/ui";
import EditorJS from "@editorjs/editorjs";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { PublishDialog } from "..";

interface EditorProps {
  draftId?: string;
}

export default function Editor({ draftId }: EditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { mutateAsync: getDraftDetail } = useGetDraftDetail();
  const { updateTitle, title, content, updateContent } = useEditorStore(
    (state) => state
  );
  const [isInitialized, setInitialState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateDraftDetail } = useUpdateDraftDetail();
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
          setInitialState(true);
        },
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
  }, []);

  // draft init
  useEffect(() => {
    const draftDetailAsync = async () => {
      if (draftId) {
        const data = await getDraftDetail(Number.parseInt(draftId));
        updateTitle(data.title);
        if (data.content && !Object.keys(data.content).length) {
          data.content = undefined;
        }
        updateContent(data.content);
        enqueueSnackbar({ message: "草稿初始化成功", variant: "success" });
      }
    };
    draftDetailAsync();
  }, [draftId, getDraftDetail, updateTitle, updateContent, enqueueSnackbar]);

  // render
  useEffect(() => {
    if (
      ref.current &&
      content &&
      Object.keys(content).length &&
      isInitialized
    ) {
      ref.current.render(content);
    }
  }, [content, isInitialized]);

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
    const content = await ref.current?.save();
    if (draftId) {
      try {
        await updateDraftDetail({
          id: Number.parseInt(draftId),
          title,
          content,
        });
        enqueueSnackbar({ message: "草稿保存成功", variant: "success" });
      } catch (err) {
        console.log(err);
      }
    }
    setIsSaving(false);
  };

  return (
    <div className="grid w-full gap-10">
      <div className="flex w-auto items-center justify-between">
        <div className="flex items-center space-x-10">
          <Button asChild>
            <Link href="/">
              <>
                <ArrowLeftIcon />
                Back
              </>
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground border-gray-70 border p-2 rounded-md shadow-md">
            {" "}
            <span className="bg-green-500 rounded-full w-2 h-2 inline-block mr-2"></span>
            Draft
          </p>

          <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm">
            Input{" "}
            <kbd className="rounded-md border bg-white px-1 text-xs uppercase">
              /
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        <div>
          <PublishDialog />
          <Button onClick={handleSave} className="ml-3">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </Button>
        </div>
      </div>
      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <TextareaAutosize
          title={title}
          defaultValue={title}
          autoFocus
          id="title"
          placeholder="Post title"
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl font-bold focus:outline-none"
        />
        <div id="editor" className="min-h-[500px]" />
      </div>
    </div>
  );
}
