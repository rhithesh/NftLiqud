"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const metaData = [
  {
    title: "Browse NFT",
    description: "Browse throught your collection",
    image: "/hand.jpg",
  },
  {
    title: "Best offer",
    description: "Get the best price",
    image: "/candy.jpeg",
  },
  {
    title: "Instant",
    description: "Instant liquidity",
    image: "/cartoon.jpg",
  },
  {
    title: "Best Price",
    description: "Offering best conversion",
    image: "/roof.jpg",
  },
  {
    title: "Muti Wallet",
    description: "Multi wallet support",
    image: "/anime.jpg",
  },
  {
    title: "Exclusive",
    description: "Exclusive platform",
    image: "/cyber.jpeg",
  },
];

export const Slider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? metaData.length - 1 : prevIndex - 1
    );
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % metaData.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovered) {
      interval = setInterval(handleNextClick, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, handleNextClick]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const circularData = [...metaData, ...metaData.slice(0, 2)];

  return (
    <div className="relative max-w-80 md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] mx-auto">
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-row rounded-3xl gap-2 md:gap-4 lg:gap-6 mt-16 md:mt-28 overflow-x-hidden"
      >
        {circularData.map((data, id) => (
          <div
            key={id}
            className="border-2 border-black rounded-3xl min-w-44 md:min-w-64 lg:min-w-96 min-h-36 hover:border-b-4 bg-slate-100 flex-shrink-0"
          >
            <Image
              src={data.image}
              alt=""
              height={1920}
              width={1080}
              className="rounded-t-3xl w-full h-24 object-cover"
            />
            <div className="p-2">
              <h1 className="font-semibold text-sm">{data.title}</h1>
              <p className="font-normal text-xs">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

