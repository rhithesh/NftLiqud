"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Wallet, Sparkles, TrendingUp, Clock, CreditCard } from 'lucide-react';
import { SellPageSkeleton } from '@/components/NftComponent/sell-page-skeleton';

const currencies = [
  { name: 'Solana', symbol: 'SOL', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { name: 'USD Coin', symbol: 'USDC', logo: '/usdc.png' },
  { name: 'Serum', symbol: 'SRM', logo: '/usdt.png' },
];

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

const NFTDetails = ({ nft }) => (
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
            <span className="font-semibold text-orange-800">{attr.trait_type}:</span>
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

const PriceEstimator = ({ estimatedPrice, finalPrice, selectedCurrency }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-lg shadow-inner"
  >
    <h3 className="text-lg font-semibold mb-2 text-orange-800">Price Estimate</h3>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Estimated Value:</span>
        <span className="font-semibold text-orange-700">{estimatedPrice} {selectedCurrency.symbol}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Platform Fee (5%):</span>
        <span className="font-semibold text-orange-700">-{estimatedPrice * 0.05} {selectedCurrency.symbol}</span>
      </div>
      <div className="flex justify-between items-center font-bold text-lg">
        <span className="text-orange-900">Final Price:</span>
        <span className="text-orange-900">{finalPrice} {selectedCurrency.symbol}</span>
      </div>
    </div>
  </motion.div>
);

const CustomSlider = ({ value, onChange }) => (
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
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [estimatedPrice, setEstimatedPrice] = useState(1000);
  const [finalPrice, setFinalPrice] = useState(950);
  const [isLoading, setIsLoading] = useState(true);
  const [saleSpeed, setSaleSpeed] = useState(50);
  const controls = useAnimation();

  const nft = {
    name: "#123 CryptoPunk",
    collection: "CryptoPunks",
    description: "A unique digital asset from the CryptoPunk collection.",
    attributes: [
      { trait_type: "Hair", value: "Mohawk" },
      { trait_type: "Eyes", value: "Sunglasses" },
      { trait_type: "Accessories", value: "Gold Chain" },
      { trait_type: "Background", value: "Blue" },
    ],
    rarity: "Top 5% of the collection",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      controls.start("animate");
    }, 2000);

    return () => clearTimeout(timer);
  }, [controls]);

  const handleSaleSpeedChange = useCallback((newValue) => {
    setSaleSpeed(newValue[0]);
    setEstimatedPrice(1000 - (newValue[0] - 50) * 10);
    setFinalPrice((1000 - (newValue[0] - 50) * 10) * 0.95);
  }, []);

  if (isLoading) {
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
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600'>
              Liquidate Your Asset
            </span>
          </motion.h1>
          
          <motion.div 
            variants={fadeInUp}
            className="relative h-80 bg-gradient-to-r from-orange-200 to-orange-400 rounded-lg mb-8 overflow-hidden shadow-lg"
          >
            <img 
              src="/Designer.jpeg" 
              alt="Selected NFT" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <motion.div 
              variants={fadeInUp}
              className="absolute bottom-4 left-4 flex items-center space-x-4"
            >
              <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                <AvatarImage src={selectedCurrency.logo} alt={selectedCurrency.name} />
                <AvatarFallback>{selectedCurrency.symbol}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-white shadow-text">{nft.name}</h2>
                <p className="text-white opacity-75 shadow-text">{nft.collection}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionCard 
              className="md:col-span-2 border-2 border-orange-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
            >
              <CardHeader>
                <CardTitle className='bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600'>
                  NFT Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NFTDetails nft={nft} />
              </CardContent>
            </MotionCard>

            <MotionCard
              variants={fadeInUp}
              className='border-2 border-orange-300 shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <CardHeader>
                <CardTitle className='bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600'>
                  Checkout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={fadeInUp}>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Currency
                  </label>
                  <Select onValueChange={(value) => setSelectedCurrency(currencies.find(c => c.symbol === value))}>
                    <SelectTrigger id="currency" className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.symbol} value={currency.symbol}>
                          <div className="flex items-center">
                            <img src={currency.logo} alt={currency.name} className="w-6 h-6 mr-2" />
                            {currency.name} ({currency.symbol})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Speed
                  </label>
                  <CustomSlider
                    value={[saleSpeed]}
                    onChange={handleSaleSpeedChange}
                  />
                </motion.div>

                <PriceEstimator 
                  estimatedPrice={estimatedPrice}
                  finalPrice={finalPrice}
                  selectedCurrency={selectedCurrency}
                />
              </CardContent>
              <CardFooter>
                <MotionButton 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Wallet className="mr-2 h-4 w-4" /> Sell NFT
                </MotionButton>
              </CardFooter>
            </MotionCard>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 p-6 rounded-lg shadow-lg bg-white border-2 border-orange-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Sparkles className="w-8 h-8 text-orange-500" />, title: "Select Currency", description: "Choose your preferred currency for the sale" },
                { icon: <TrendingUp className="w-8 h-8 text-orange-500" />, title: "Set Sale Speed", description: "Adjust the slider to balance between speed and price" },
                { icon: <Clock className="w-8 h-8 text-orange-500" />, title: "Review Estimate", description: "Check the estimated value and final price" },
                { icon: <Wallet className="w-8 h-8 text-orange-500" />, title: "Initiate Sale", description: "Click 'Sell NFT' to start the transaction" },
                { icon: <CreditCard className="w-8 h-8 text-orange-500" />, title: "Confirm Transaction", description: "Approve the transaction in your wallet" },
                { icon: <ArrowRight className="w-8 h-8 text-orange-500" />, title: "Receive Tokens", description: "Get your SPL tokens instantly!" },
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-lg shadow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.icon}
                  <h3 className="text-lg font-semibold mt-2 text-orange-800">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">
              Ready to Convert Your NFT?
            </h2>
            <p className="text-xl text-gray-600 mb-6">Get instant liquidity for your digital assets!</p>
            <MotionButton 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(251, 146, 60)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Selling <ArrowRight className="ml-2 h-5 w-5" />
            </MotionButton>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
