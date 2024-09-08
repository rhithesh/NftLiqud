"use client";
import React from "react";
import { BackgroundGradient } from "../BackgroundGradient";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardItem {
  imageUrl: string;
  title: string;
  price: number;
  creator: string;
}

export function Card({ imageUrl, title, price, creator }: CardItem) {
  const router = useRouter();
  return (
    <div className="w-[15rem] m-auto mt-[6rem]">
      <BackgroundGradient className="rounded-[22px] max-w-sm  p-2 bg-white dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt={title}
          height={400}
          width={400}
          className="object-contain rounded-[22px]"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>
        <div className="flex justify-between items-center mt-[2rem] mb-[2rem]  ">
          <button
            onClick={() => router.push("/")}
            className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black  text-xs font-bold dark:bg-zinc-800 gap-2"
          >
            <span className="text-xl font-thin">Swap</span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem]  text-white text-thin p-3">
              {price}
            </span>
          </button>
          <p className="text-white text-xl font-thin">{creator}</p>
        </div>
      </BackgroundGradient>
    </div>
  );
}

