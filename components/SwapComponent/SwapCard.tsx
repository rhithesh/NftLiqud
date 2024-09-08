"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BackgroundGradient } from "../ui/BackgroundGradient";

interface Params {
  id: string;
}

interface NFTData {
  id: string;
  imageurl: string;
  title: string;
  creator: string;
  price: number;
}

export function SwapCard({ id }: Params) {
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/nftdata.json/${id}`)
      .then((response) => {
        setNftData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching NFT data:", error);
        setError("Failed to load NFT data. Please try again later.");
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex px-5">
      <div className="mt-[6rem]">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-2 bg-white dark:bg-zinc-900">
          {nftData ? (
            <>
              <Image
                src={""}
                alt="title"
                height={500}
                width={400}
                className="object-cover rounded-[22px]"
              />
              <div className="p-5">
                <p className="text-base sm:text-xl text-black mt-4 mb-4 dark:text-neutral-200">
                  title
                </p>
                <p className="text-white text-xl font-thin">creator</p>
              </div>
            </>
          ) : (
            <div className="text-center p-5">Loading...</div>
          )}
        </BackgroundGradient>
      </div>
    </div>
  );
}

