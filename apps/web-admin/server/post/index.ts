import { OutputData } from "@editorjs/editorjs";
import { useMutation } from "@tanstack/react-query";
import { client } from "../request";

interface DraftItem {
  id: number;
  is_published: number;
  title: string;
  blog_id: number;
  content: OutputData | undefined;
  create_time: string;
  update_time: string;
}

export function useCreateDraft() {
  return useMutation({
    mutationFn: async () => {
      return client.post<DraftItem>({ url: "/draft" });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
}

export function useGetDraftDetail() {
  return useMutation({
    mutationFn: async (id: number) => {
      return client.get<DraftItem>({ url: `/draft/${id}` });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
}

export function useUpdateDraftDetail() {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      id,
    }: {
      title: string;
      content: any;
      id: number;
    }) => {
      return client.put<DraftItem>({
        url: `/draft/${id}`,
        data: {
          title,
          content,
        },
      });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
}

export function usePublishDraft() {
  return useMutation({
    mutationFn: async (postId: number) => {
      await client.post({ url: "/draft", data: { postId } });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
