import { redirect } from "next/navigation";

const createPost = async () => 1;

export const GET = async () => {
  const postId = await createPost();
  redirect(`/editor/${postId}`);
};
