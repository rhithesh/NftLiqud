"use client";

import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"
import { useRouter } from "next/navigation";

export function ConnectionSection() {

  const wallet = useWallet();
  const router = useRouter()

  return (<div className="flex flex-row justify-between p-4 md:p-8 bg-orange-100 items-center">
    <div className="flex flex-col items-center justify-center mx-8 md:mx16 lg:mx-24">
      <h2 className="font-extrabold text-2xl md:text-4xl lg:text-5xl md:mb-2 lg:mb-4">
        Liquidate Your NFT Now
      </h2>
      {(!wallet.publicKey) ? 
      <button className="px-2 py-1 md:px-4 md:py-2 rounded-3xl md:border-b-4 font-semibold md:text-2xl lg:text-4xl lg:px-8 lg:py-4 md:font-bold bg-orange-400 hover:cursor-pointer mt-2 md:mt-4 hover:bg-orange-500 border-b-2 border-black shadow-lg ">
        Connect Wallet
      </button> :
      <button className="px-2 py-1 md:px-4 md:py-2 rounded-3xl md:border-b-4 font-semibold md:text-2xl lg:text-4xl lg:px-8 lg:py-4 md:font-bold bg-orange-400 hover:cursor-pointer mt-2 md:mt-4 hover:bg-orange-500 border-b-2 border-black shadow-lg "
        onClick={()=>router.push("swap")}>
      Liquidate
        </button> 
      }
    </div>
    <Image
      src={"/pikachu.gif"}
      alt="pikachu"
      width={1920}
      height={1080}
      className="object-cover max-w-52 w-1/2 rounded-3xl md:mr-8 lg:mr-28"
    />
  </div>
  )
}
