"use client";

/**
 * @author Saksham Tomar
 * @params TokenName is the name of the token whose price we want to get
 */

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import getTokenPrice from "@/components/helper/getSplPrice";

export default function Component() {
  const [selectedToken, setSelectedToken] = useState<string>("SOL");
  const [tokenPrice, setTokenPrice] = useState<string | undefined>("100.0");
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [userNFTs, setUserNFTs] = useState([
    { id: 1, name: "NFT 1", image: "/solanaLogo.png" },
    { id: 2, name: "NFT 2", image: "/solanaLogo.png" },
    { id: 3, name: "NFT 3", image: "/solanaLogo.png" },
    { id: 4, name: "NFT 4", image: "/solanaLogo.png" },
  ]);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      const chainPrice = await getTokenPrice(selectedToken);
      const tokenChainPrice = chainPrice?.data?.[selectedToken]?.price;
      setTokenPrice(parseFloat(tokenChainPrice).toString());
      console.log(tokenChainPrice);
    };
    fetchTokenPrice();
  }, [selectedToken]);

  const handleTokenChange = (token: string) => {
    setSelectedToken(token);
    setTokenPrice((Math.floor(Math.random() * 1000) / 10).toString());
  };

  const handleNFTChange = (nft) => {
    setSelectedNFT(nft);
  };

  const handleLiquidate = (): void => {
    console.log(`Liquidating NFT for ${selectedToken} at ${tokenPrice}`);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              NFT Liquidation
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Easily liquidate your NFTs for the best price in the market.
            </p>
            {selectedNFT && (
              <div className="grid gap-2">
                <label htmlFor="nft" className="text-sm font-medium">
                  Selected NFT
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src="/solanaLogo.png"
                    width={80}
                    height={80}
                    alt={selectedNFT.name}
                    className="rounded-md"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <div>
                    <div className="font-medium">{selectedNFT.name}</div>
                    <div className="text-muted-foreground text-sm">
                      ID: {selectedNFT.id}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <label htmlFor="nft" className="text-sm font-medium">
                Select NFT
              </label>
              <Select
                id="nft"
                value={selectedNFT?.id?.toString()}
                onValueChange={(value) =>
                  handleNFTChange(
                    userNFTs.find((nft) => nft.id.toString() === value)
                  )
                }
                className="w-full max-w-[200px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select NFT" />
                </SelectTrigger>
                <SelectContent>
                  {userNFTs.map((nft) => (
                    <SelectItem key={nft.id} value={nft.id.toString()}>
                      {nft.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="token" className="text-sm font-medium">
                Select Token
              </label>
              <Select
                id="token"
                value={selectedToken}
                onValueChange={handleTokenChange}
                className="w-full max-w-[200px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">
                Current Price
              </label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <span className="text-2xl font-bold">{tokenPrice}</span>
              </div>
            </div>
            <Button
              onClick={handleLiquidate}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Liquidate
            </Button>
          </div>
          <img
            src="/creater.jpg"
            width="550"
            height="550"
            alt="NFT Liquidation"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
