"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/NftComponent/NftCard";
import { getAssetsByOwner } from "@/helperFunctions/getAssetsByOwner";
import { useWallet } from "@solana/wallet-adapter-react";

interface CardProps {
  id: string;
  name: string;
  imageurl: string;
  description: string;
}

export function NftDisplay() {
  const [nftCollection, setNftCollection] = useState<CardProps[]>([]);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      return;
    }
    const fetchNft = async () => {
      try {
        const assets = await getAssetsByOwner(publicKey.toString());
        setNftCollection(assets);
      } catch (error) {
        console.log("Error connecting to wallet:", error);
      }
    };
    fetchNft();
  }, [publicKey]);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full max-w-7xl">
        {nftCollection.map((card: CardProps, index) => (
          <div key={index} className="flex justify-center">
            <Card data={card} />
          </div>
        ))}
      </div>
    </div>
  );
}