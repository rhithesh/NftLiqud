"use client";

import React from 'react';
import { Card } from "./NftCard"; 

const nftCollection = [
  {
    id: "1",
    imageUrl: "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8218.png",
    title: "Cosmic Perspective #42",
    creator: "AstroArtist",
    price: 0.5,
  },
  {
    id: "2",
    imageUrl: "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8218.png",
    title: "Cosmic Perspective #42",
    creator: "AstroArtist",
    price: 0.5,
  },
  {
    id: "3",
    imageUrl: "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8218.png",
    title: "Cosmic Perspective #42",
    creator: "AstroArtist",
    price: 0.5,
  },
  {
    id: "4",
    imageUrl: "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8218.png",
    title: "Cosmic Perspective #42",
    creator: "AstroArtist",
    price: 0.5,
  },
];

export function NftDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {nftCollection.map((nft) => (
        <Card
          key={nft.id}
          imageUrl={nft.imageUrl}
          title={nft.title}
          creator={nft.creator}
          price={nft.price}
        />
      ))}
    </div>
  );
}
