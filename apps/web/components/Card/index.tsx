"use client";

import { Hover, WobbleCard } from "@benjamin/ui";
import { LayersIcon } from "@radix-ui/react-icons";
import Image from "next/image";
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
export function CardWithImg({ item }: CardWithImgProps) {
  return (
    <WobbleCard className="w-full bg-white dark:bg-slate-800/50  rounded-md border dark:shadow-[inset_0_1px_0_1px_rgba(148,163,184,0.1)] border-none dark:drop-shadow-lg cursor-grab shadow-md">
      <div className="p-5 lg:p-10 lg:grid lg:grid-cols-3 lg:gap-9">
        <Hover
          className="dark:opacity-90 relative  rounded-md shadow-sm hover:shadow-md h-img min-h-full w-full col-span-1 border border-gray-200 transition-all"
          perspective={1000}
          max={37}
          scale={1.01}
        >
          <Image
            fill
            src={item.post_img.url}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="rounded-md object-cover"
            alt={`featured-image-${item.post_title}`}
            loading="lazy"
          />
        </Hover>
        <div className="col-span-2">
          <div className="flex items-center">
            <div className="flex space-x-2">
              <Label>
                <LayersIcon className="w-5 mr-2 h-5" />
                {item.post_categories[0].name}
              </Label>
            </div>
          </div>

          <div className="lg:mt-4 mt-6">
            <div>
              <h1
                className="font-medium text-2xl lg:text-listTitle text-gray-700 dark:text-white tracking-wider mb-5"
                dangerouslySetInnerHTML={{ __html: item.post_title }}
              />
            </div>
            <p
              className="text-gray-500 dark:text-gray-400 text-4 lg:text-3 tracking-wide leading-2 lg:leading-8 overflow-hidden text-ellipsis"
              dangerouslySetInnerHTML={{
                __html: trimStr(item.post_excerpt.four, 150),
              }}
            />
          </div>
        </div>
      </div>
    </WobbleCard>
  );
}
