"use client";

import { Hover, WobbleCard } from "@benjamin/ui";
import { LayersIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { baseURL } from "~/server/request/config";
import blurDataURL from "~/util/blurDataURL";
import Label from "../Label";

export const trimStr = (str: string, n: number) => {
  if (str.replace(/[\u4e00-\u9fa5]/g, "**").length <= n) {
    return str;
  } else {
    let len = 0;
    let tmpStr = "";
    for (let i = 0; i < str.length; i++) {
      if (/[\u4e00-\u9fa5]/.test(str[i]!)) {
        len += 2;
      } else {
        len += 1;
      }
      if (len > n) {
        break;
      } else {
        tmpStr += str[i];
      }
    }
    return tmpStr.replace(" ", "") + " ...";
  }
};
interface CardWithImgProps {
  item: any;
  sticky?: boolean;
}
export default function CardWithImg({ item }: CardWithImgProps) {
  return (
    <WobbleCard containerClassName="bg-white dark:bg-slate-800/50 dark:shadow-[inset_0_1px_0_1px_rgba(148,163,184,0.1)] border-none dark:drop-shadow-lg cursor-grab overflow-hidden shadow-sm hover:shadow-md">
      <div className="p-8 sm:p-7 sm:grid sm:grid-cols-3 lg:gap-9 sm:gap-6 rounded-2xl">
        <Hover
          className="dark:opacity-90 relative rounded-md shadow-sm hover:shadow-md h-img min-h-full sm:w-full sm:col-span-1 border border-gray-200 transition-all md:block"
          perspective={1000}
          max={37}
          scale={1.01}
        >
          <Image
            fill
            src={`${baseURL}/static/${item.blog_pic}`}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="rounded-md object-cover"
            alt={`featured-image-${item.title}`}
            loading="lazy"
          />
        </Hover>
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <div className="flex space-x-2 mt-8 sm:mt-0">
              <Label>
                <LayersIcon className="mr-2 w-5 h-5" />
                {item.category?.title}
              </Label>
            </div>
          </div>

          <div className="lg:mt-4 md:mt-4 mt-6">
            <div>
              <h1
                className="font-medium lg:text-2xl text-lg lg:text-listTitle text-gray-700 dark:text-white tracking-wider mb-5"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
            </div>
            <p
              className="text-gray-500 dark:text-gray-400 text-base lg:text-3 tracking-wide leading-2 md:leading-6 lg:leading-8 text-ellipsis"
              dangerouslySetInnerHTML={{
                __html: trimStr(item.content, 150),
              }}
            />
          </div>
        </div>
      </div>
    </WobbleCard>
  );
}
