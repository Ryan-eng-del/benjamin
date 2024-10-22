"use client";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardEmpty, CardSkeleton, CardWithImg } from "~/components";
import { useInfiniteQueryPost } from "~/server";
import { usePager } from "~/server/post";

export default function List() {
  const nextInfinitePager = usePager();
  const { data, fetchNextPage, isFetching, isError } =
    useInfiniteQueryPost(nextInfinitePager);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isError) setHasMore(false);
    if (!data) return;

    if (data && nextInfinitePager.getLastPageSize() < 10) {
      setHasMore(false);
    }
  }, [data, isError]);

  let totalDataLen = useMemo(() => {
    if (!data) return 0;

    return data.pages.reduce((pre, cur) => {
      if (!cur) return pre;
      return pre + cur.length;
    }, 0);
  }, [data]);
  return (
    <InfiniteScroll
      dataLength={totalDataLen}
      next={() => {
        if (isFetching) {
          return;
        }
        nextInfinitePager.nextPage();
        fetchNextPage();
      }}
      hasMore={hasMore}
      loader={<CardSkeleton />}
      endMessage={<CardEmpty />}
      scrollThreshold="100px"
    >
      {data?.pages?.map((page) => {
        return page?.map((item: any) => {
          return (
            <div className="mb-6">
              <CardWithImg item={item} key={item.id}></CardWithImg>
            </div>
          );
        });
      })}
    </InfiniteScroll>
  );
}
