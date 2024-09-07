import { useState } from "react";
import { motion } from "framer-motion";
import SolanaLogo from "@/public/solanaLogo.png";

interface NFTDisplayProps {
  imageUrl: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  price: number;
}

export default function Component({
  imageUrl = "/placeholder.svg?height=400&width=400",
  title = "Cosmic Perspective #42",
  creator = "AstroArtist",
  creatorAvatar = "/placeholder.svg?height=50&width=50",
  price = 0.5,
}: NFTDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={SolanaLogo}
          alt={title}
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
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={creatorAvatar}
            alt={creator}
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm">{creator}</p>
        </div>
        <div className="flex items-center">
          <EthereumIcon className="h-5 w-5 text-blue-500 mr-1" />
          <span className="text-gray-700 dark:text-gray-300 font-bold">
            {price} ETH
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
