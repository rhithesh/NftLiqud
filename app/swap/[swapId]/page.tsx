"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { SellPageSkeleton } from "@/components/NftComponent/sell-page-skeleton";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Currency = {
  name: string;
  symbol: string;
  logo: string;
};

const currencies: Currency[] = [
  {
    name: "Solana",
    symbol: "SOL",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  { name: "USD Coin", symbol: "USDC", logo: "/usdc.png" },
  { name: "Serum", symbol: "SRM", logo: "/usdt.png" },
];

const MotionButton = motion(Button);

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

type Nft = {
  name: string;
  image: string;
  description: string;
  collection?: string;
  attributes: { trait_type: string; value: string }[];
  rarity: string;
};

interface NFTDetailsProps {
  nft: Nft;
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ nft }) => (
  <div className="space-y-4">
    <motion.div variants={fadeInUp}>
      <h3 className="text-lg font-semibold text-slate-400">Description</h3>
      <p className="text-gray-600 text-sm lg:text-base">{nft.description}</p>
    </motion.div>
    <motion.div variants={fadeInUp}>
      <h3 className="text-lg font-semibold text-gray-400">Attributes</h3>
      <div className="grid grid-cols-2 gap-2">
        {nft.attributes.map((attr, index) => (
          <div key={index} className="bg-orange-100 rounded-md p-2">
            <span className="font-semibold text-orange-800">
              {attr.trait_type}:
            </span>
            <span className="text-orange-600 ml-1">{attr.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
    <motion.div variants={fadeInUp}>
      <h3 className="text-lg font-semibold text-gray-400">Rarity</h3>
      <p className="text-gray-600">{nft.rarity}</p>
    </motion.div>
  </div>
);

const PriceEstimator = ({
  estimatedPrice,
  finalPrice,
  selectedCurrency,
}: {
  estimatedPrice: number;
  finalPrice: number;
  selectedCurrency: Currency;
}) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-lg shadow-inner"
  >
    <h3 className="text-lg font-semibold mb-2 text-orange-800">
      Price Estimate
    </h3>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Estimated Value:</span>
        <span className="font-semibold text-orange-700">
          {estimatedPrice} {selectedCurrency.symbol}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Platform Fee (5%):</span>
        <span className="font-semibold text-orange-700">
          -{estimatedPrice * 0.05} {selectedCurrency.symbol}
        </span>
      </div>
      <div className="flex justify-between items-center font-bold text-lg">
        <span className="text-orange-900">Final Price:</span>
        <span className="text-orange-900">
          {finalPrice} {selectedCurrency.symbol}
        </span>
      </div>
    </div>
  </motion.div>
);

const CustomSlider = ({
  value,
  onChange,
}: {
  value: number[];
  onChange: (value: number[]) => void;
}) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
          Slower
        </span>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
          Faster
        </span>
      </div>
    </div>
    <Slider
      value={value}
      onValueChange={onChange}
      max={100}
      step={1}
      className="w-full"
    />
    <div className="flex justify-between text-xs text-orange-600 px-2 mt-1">
      <span>Higher Price</span>
      <span>{value}%</span>
      <span>Lower Price</span>
    </div>
  </div>
);

export default function SellPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0]
  );
  const [estimatedPrice, setEstimatedPrice] = useState(1000);
  const [finalPrice, setFinalPrice] = useState(950);
  const [isLoading, setIsLoading] = useState(true);
  const [saleSpeed, setSaleSpeed] = useState(50);
  const controls = useAnimation();
  const [nft, setNft] = useState<Nft | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const nftName = searchParams.get('name');
    const nftImage = searchParams.get('image');
    const nftDescription = searchParams.get('description');

    setNft({
      name: nftName || 'Unknown NFT',
      image: nftImage || '/placeholder.png',
      description: nftDescription || 'No description available',
      collection: 'Sample Collection',
      attributes: [
        { trait_type: 'Sample Trait', value: 'Sample Value' }
      ],
      rarity: 'Common'
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      controls.start("animate");
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, controls]);

  const handleSaleSpeedChange = useCallback((newValue: number[]) => {
    setSaleSpeed(newValue[0]);
    setEstimatedPrice(1000 - (newValue[0] - 50) * 10);
    setFinalPrice((1000 - (newValue[0] - 50) * 10) * 0.95);
  }, []);

  if (isLoading || !nft) {
    return <SellPageSkeleton />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="min-h-screen mt-[6rem] bg-gradient-to-br from-gray-100 to-orange-50 p-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold mb-8 text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">
              Liquidate Your Asset
            </span>
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className="relative h-80 bg-gradient-to-r from-orange-200 to-orange-400 rounded-lg mb-8 overflow-hidden shadow-lg"
          >
            <Image
              src={nft.image}
              alt="Selected NFT"
              className="w-full h-full object-cover mix-blend-overlay"
              width={800}
              height={600}
            />
            <motion.div
              variants={fadeInUp}
              className="absolute bottom-4 left-4 flex items-center space-x-4"
            >
              <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                <AvatarImage
                  src={selectedCurrency.logo}
                  alt={selectedCurrency.name}
                />
                <AvatarFallback>{selectedCurrency.symbol}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{nft.name}</h2>
                <p className="text-sm text-gray-700">{nft.collection}</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <NFTDetails nft={nft} />
              </CardContent>
              <CardFooter>
                <Select
                  value={selectedCurrency.symbol}
                  onValueChange={(value) => {
                    const selected = currencies.find(
                      (currency) => currency.symbol === value
                    );
                    if (selected) {
                      setSelectedCurrency(selected);
                    } else {
                      console.warn("Currency not found:", value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={selectedCurrency.logo}
                            alt={selectedCurrency.name}
                          />
                          <AvatarFallback>
                            {selectedCurrency.symbol}
                          </AvatarFallback>
                        </Avatar>
                        <span>{selectedCurrency.name}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.symbol} value={currency.symbol}>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={currency.logo}
                              alt={currency.name}
                            />
                            <AvatarFallback>{currency.symbol}</AvatarFallback>
                          </Avatar>
                          <span>{currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Price Estimator</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceEstimator
                  estimatedPrice={estimatedPrice}
                  finalPrice={finalPrice}
                  selectedCurrency={selectedCurrency}
                />
              </CardContent>
              <CardFooter>
                <CustomSlider
                  value={[saleSpeed]}
                  onChange={handleSaleSpeedChange}
                />
              </CardFooter>
            </Card>
          </motion.div>
          <div className="flex justify-center mt-8">
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white"
            >
              <span>Confirm Sale</span>
              <ArrowRight className="ml-2" />
            </MotionButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
