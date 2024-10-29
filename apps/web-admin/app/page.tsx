"use client";
import { useCreateDraft } from "@/server/post";
import { Button } from "@benjamin/ui";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { mutateAsync: createDraftApi, isPending } = useCreateDraft();

  const router = useRouter();

  const handlePublish = async () => {
    try {
      const draftData = await createDraftApi();
      router.push(`/editor/${draftData.id}`);
    } catch (err) {
      // todo
    }
  };

  return (
    <div className="w-content mx-auto py-6 px-3 flex">
      <Button onClick={handlePublish} disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        发文章
      </Button>
      <Button className="mx-5">管理文章</Button>
      <Button>管理标签</Button>
      <Button className="mx-5">管理草稿</Button>
    </div>
  );
}
