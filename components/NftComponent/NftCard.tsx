"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardItem {
  imageUrl: string;
  title: string;
  id: string;
}

export function Card({ imageUrl, title, id }: CardItem) {
  const router = useRouter();
  return (
    <div
      className="flex p-5 hover:cursor-pointer  z-20"
      onClick={() => {
        router.push(`swap/${id}`);
      }}
    >
      <div className="m-auto mt-[6rem] w-[20rem] h-[15rem] ">
        <BackgroundGradient className="rounded-[22px] max-w-sm  p-2 bg-white dark:bg-zinc-900">
          <Image
            src={imageUrl}
            alt={title}
            height={400}
            width={400}
            className="object-cover w-full rounded-[22px]"
          />
          <p className="text-base text-sm text-black mt-4 mb-2 dark:text-neutral-200">
            {title}
          </p>
        </BackgroundGradient>
      </div>
    </div>
  );
}
