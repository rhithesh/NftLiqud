"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import questionMark from "../../public/questionMark.png";
import { useRouter } from "next/navigation";

interface CardProps {
  data: {
    id: string;
    name: string;
    imageurl: string;
    description: string;
  };
}

function Card({ data }: CardProps) {
  const [draw, setDraw] = useState(false);

  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    router.push(`swap/${data.id}`);
  };

  return (
    <motion.div
      onClick={() => setDraw(!draw)}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1, x: [1000, 0] }}
      exit={{ x: [0, 1000] }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ rotateY: 180 }}
      className="min-h-96 mt-[5rem] relative border-2 border-black min-w-64 bg-gradient-to-r from-orange-300 to-yellow-200 flex flex-col items-center justify-center max-w-64 rounded-3xl shadow-xl shadow-orange-400 cursor-pointer"
    >
      <div
        className="w-full h-full flex flex-col items-center justify-between"
        style={{ backfaceVisibility: "hidden" }}
      >
        {draw ? (
          <>
            <p className="absolute z-20 bg-gradient-to-tl from-purple-500 to-orange-600 ring-2 ring-red-400 text-white px-2 rounded-2xl text-sm font-bold translate-x-24 translate-y-2">
              {data.name}
            </p>
            <Image
              className="rounded-xl max-w-56 ring-1 ring-black mt-4"
              src={data.imageurl}
              alt="kitty"
              width={1920}
              height={1080}
            />
            <div className="flex flex-col mb-auto mt-2 items-center justify-center">
              <h1 className="font-bold font-mono text-lg">Description</h1>
              <div className="pt-4 p-2 mt-1 min-w-56 max-w-56 min-h-20 bg-white rounded-md mx-2 ">
                <p className="font-medium text-sm font-mono text-black">
                  {data.description}
                </p>
              </div>
              <button
                onClick={handleClick}
                className="flex items-center justify-center rounded-3xl bg-lime-300 font-semibold text-xs ml-auto mr-4 mt-4 cursor-pointer hover:bg-lime-400 px-4 border m-2 border-black py-1"
              >
                Swap
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image
              className="hover:animate-bounce"
              src={questionMark}
              alt="question"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
