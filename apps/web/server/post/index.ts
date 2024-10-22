import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { client } from "~/server";

interface Pager {
  setBroken(breakPage: number): void;
  nextPage(): void;
  getPage(): number;
}

const INIT_PAGE = 1;

export function usePager(): Pager {
  const page = useRef(INIT_PAGE);

  const setBroken = (breakPage: number) => {
    page.current = breakPage - 1;
  };
  const nextPage = () => {
    page.current += 1;
  };

  const getPage = () => {
    return page.current;
  };

  return { setBroken, nextPage, getPage };
}

export function useInfiniteQueryPost({ setBroken, getPage }: Pager) {
  return useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: async () => {
      try {
        const postDatas = client.get();
        return postDatas;
      } catch (error) {
        setBroken(getPage());
        console.log(error);
      }
    },
    initialPageParam: INIT_PAGE,
    getNextPageParam: () => getPage(),
  });
}
