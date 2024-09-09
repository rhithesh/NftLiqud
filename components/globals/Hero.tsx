"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const router = useRouter();
  return (
    <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-700  text-center font-sans font-bold">
          Swap Your NFT&apos;s
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Swap your NFTs for SPL tokens instantly with our decentralized liquidation pool. Our platform provides immediate liquidity, allowing users to exchange their NFTs for supported SPL tokens in a secure and transparent manner. No need to wait for buyers&mdash;just deposit your NFT and receive tokens effortlessly.
        </p>
      </div>
      <Button className="z-20 rounded-full text-xl font-thin" onClick={()=> router.push('/swap')}>Swap</Button>
    </div>)
}
