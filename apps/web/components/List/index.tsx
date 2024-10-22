"use client";
import { useEffect } from "react";
import { CardWithImg } from "~/components";
import { useInfiniteQueryPost } from "~/server";
import { usePager } from "~/server/post";

export default function List() {
  const nextInfinitePager = usePager();
  const { data, fetchNextPage, isLoading } =
    useInfiniteQueryPost(nextInfinitePager);

  useEffect(() => {
    console.log(data?.pages, data?.pageParams);
  });

  return (
    <>
      {isLoading && <div>Loading</div>}
      {data?.pages.map((page) => {
        return page.map((item: any) => {
          return (
            <div className="mb-6">
              <CardWithImg item={item} key={item.id}></CardWithImg>
            </div>
          );
        });
      })}
    </>
  );
}
