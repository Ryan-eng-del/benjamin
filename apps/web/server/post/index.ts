import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { client } from "~/server";

interface Pager {
  setBroken(breakPage: number): void;
  nextPage(): void;
  getPage(): number;
  setPageSize(size: number): void;
  getLastPageSize(): number;
}

const INIT_PAGE = 1;

export function usePager(): Pager {
  const page = useRef(INIT_PAGE);
  const pageSize = useRef(0);

  const setBroken = (breakPage: number) => {
    page.current = breakPage;
  };
  const nextPage = () => {
    page.current += 1;
  };

  const getPage = () => {
    return page.current;
  };

  const getPageSize = () => {
    return pageSize.current;
  };

  const setPageSize = (size: number) => {
    pageSize.current = size;
  };

  return {
    setBroken,
    nextPage,
    getPage,
    setPageSize,
    getLastPageSize: getPageSize,
  };
}

export function useInfiniteQueryPost({
  setBroken,
  getPage,
  setPageSize,
}: Pager) {
  return useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: async () => {
      try {
        const postDatas = await client.get({
          url: `https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&per_page=10&categories_exclude=5,2,74,334,335&page=${getPage()}`,
        });
        setPageSize(postDatas.length);
        return postDatas;
      } catch (error) {
        console.log(error);
        setBroken(getPage());
        return Promise.reject(error);
      }
    },
    initialPageParam: INIT_PAGE,
    getNextPageParam: () => getPage(),
  });
}
