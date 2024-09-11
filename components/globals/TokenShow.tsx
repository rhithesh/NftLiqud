import React from "react";
import { token } from "@/lib/token";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export const TokenShow = () => {
  return (
    <Marquee>
      {token.map((token, index) => {
        return (
          <div
            key={index}
            className="ml-8 gap-2 border-r-2 p-1  border-black min-h-full flex flex-row items-center justify-center"
          >
            <Image
              src={token.imageUrl}
              alt=""
              width={1920}
              height={1080}
              className="ml-2 w-20"
            />
            <h1 className="font-semibold text-base pr-2 md:text-2xl lg:text-3xl xl:text-4xl">
              {token.name}
            </h1>
          </div>
        );
      })}
    </Marquee>
  );
};

