"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./NftCard";

interface Nft {
  id: string;
  imageurl: string;
  title: string;
  creator: string;
  price: number;
}

export function NftDisplay() {
  const [nftCollection, setNftCollection] = useState<Nft[]>([]);
  useEffect(() => {
    axios
      .get(`/nftdata.json`)
      .then((response) => {
        setNftCollection(response.data);
      })
      .catch((error) => {
        console.error("Error fetching NFT data:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {nftCollection.map((nft) => (
        <Card
          key={nft.id}
          id={nft.id}
          imageUrl={nft.imageurl}
          title={nft.title}
          creator={nft.creator}
          price={nft.price}
        />
      ))}
    </div>
  );
}
