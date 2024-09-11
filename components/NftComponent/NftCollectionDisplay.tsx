"use client";
import React, { useEffect, useState } from "react";
import  Card  from "@/components/NftComponent/NftCard";
import { getAssetsByOwner } from "@/helperFunctions/getAssetsByOwner";
import { useWallet } from "@solana/wallet-adapter-react";

interface CardProps {
  id : string;
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
    <div className="grid grid-cols-4 gap-4 p-6"> {/* Added padding */}
      {nftCollection.map((card: CardProps, index) => (
        <Card key={index} data={card} />
      ))}
    </div>
  );
}
