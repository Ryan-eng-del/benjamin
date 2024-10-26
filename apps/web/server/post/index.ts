import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "~/server";
import { baseURL } from "~/server/request/config";

interface Pager {
  setBroken(breakPage: number): void;
  nextPage(): void;
  getPage(): number;
  setPageSize(size: number): void;
  getLastPageSize(): number;
}

const INIT_PAGE = 1;

export function useInfiniteQueryPost() {
  return useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: async (context) => {
      try {
        const postDatas = await client.get({
          url: `${baseURL}/blog?page=${context.pageParam}&page_size=10`,
        });
        return postDatas;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    initialPageParam: INIT_PAGE,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page;
    },
  });
}
