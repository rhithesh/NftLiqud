"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./NftCard";
import { getAssetsByOwner } from "@/helperFunctions/getAssetsByOwner";

interface Nft {
  id: string;
  imageurl: string;
  title: string;
}
export function NftDisplay() {
  const [nftCollection, setNftCollection] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchNft = async () => {
      try {
        if (typeof window.solana !== "undefined" && window.solana.isPhantom) {
          const response = await window.solana.connect();
          console.log("Connection response:", response); 

          if (response.publicKey) {
            const userAddress = response.publicKey.toString();
            console.log("User address:", userAddress);
            const assets = await getAssetsByOwner(userAddress);
            setNftCollection(assets);
          } else {
            console.error("Failed to retrieve the public key from the wallet");
          }
        } else {
          console.error("Solana wallet not found or not Phantom");
        }
      } catch (error) {
        console.log("Error connecting to wallet:", error);
      }
    };

    fetchNft();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {nftCollection.map((nft) => (
        <Card
          key={nft.id}
          imageUrl={nft.imageurl}
          title={nft.title}
        />
      ))}
    </div>
  );
}

