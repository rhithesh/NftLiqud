"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SolanaLogo from "@/public/solanaLogo.png";
import Image from "next/image";
interface NFTDisplayProps {
  imageUrl: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  price: number;
}

export default function NftDisplay({
  imageUrl = "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8218.png",
  title = "Cosmic Perspective #42",
  creator = "AstroArtist",
  creatorAvatar = "/placeholder.svg?height=50&width=50",
  price = 0.5,
}: NFTDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-[300px] rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          className="w-full h-64 object-cover"
          src={imageUrl}
          alt={title}
          width={300}
          height={300}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
          <button className="bg-white text-black font-bold py-2 px-4 rounded">
            View Details
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
          {title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Created by <span className="font-semibold">{creator}</span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="w-10 h-10 rounded-full mr-4"
            src={SolanaLogo}
            alt={creator}
            width={100}
            height={100}
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm">{creator}</p>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 dark:text-gray-300 font-bold">
            {price} SOL
          </span>
        </div>
      </div>
      <motion.div
        className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
