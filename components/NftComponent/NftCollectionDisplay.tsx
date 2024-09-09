"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./NftCard";
import { getAssetsByOwner } from "@/helperFunctions/getAssetsByOwner";
import { useWallet } from "@solana/wallet-adapter-react";

interface Nft {
  id: string;
  imageurl: string;
  title: string;
}
export function NftDisplay() {
  const [nftCollection, setNftCollection] = useState<Nft[]>([]);

  const { publicKey } = useWallet();
  console.log(publicKey);
  useEffect(() => {
    if (!publicKey) {
      return;
    }

    const fetchNft = async () => {
      try {
        //toBase58() in case toString() does not work well

        const assets = await getAssetsByOwner(publicKey.toString());
        setNftCollection(assets);
      } catch (error) {
        console.log("Error connecting to wallet:", error);
      }
    };

    fetchNft();
  }, [publicKey]); // Trigger useEffect when publicKey changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {nftCollection.map((nft) => (
        <Card key={nft.id} imageUrl={nft.imageurl} title={nft.title} />
      ))}
    </div>
  );
}
