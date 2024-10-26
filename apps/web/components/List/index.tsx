"use client";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardEmpty, CardSkeleton, CardWithImg } from "~/components";
import { useInfiniteQueryPost } from "~/server";

export default function List() {
  const { data, fetchNextPage, isFetching, isError } = useInfiniteQueryPost();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isError) setHasMore(false);
    if (!data) return;
    if (
      data &&
      data.pages.length &&
      data.pages[data.pages.length - 1].items.length < 10
    ) {
      setHasMore(false);
    }
  }, [data, isError]);

  let totalDataLen = useMemo(() => {
    if (!data) return 0;

    return data.pages.reduce((pre, cur) => {
      if (!cur) return pre;
      return pre + cur.items.length;
    }, 0);
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={totalDataLen}
      next={() => {
        if (isFetching) {
          return;
        }
        fetchNextPage();
      }}
      hasMore={hasMore}
      loader={<CardSkeleton />}
      endMessage={<CardEmpty />}
      scrollThreshold="20px"
    >
      {data?.pages?.map((page) => {
        return page.items?.map((item: any) => {
          return (
            <div className="mb-6" key={item.id}>
              <CardWithImg item={item}></CardWithImg>
            </div>
          );
        });
      })}
    </InfiniteScroll>
  );
}
