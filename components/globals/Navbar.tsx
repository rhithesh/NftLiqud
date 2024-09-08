"use client";

import { useRouter } from "next/navigation";
import WalletConnection from "../WalletConnection";

export function Navbar() {
  const router = useRouter();
  return (
    <header className="absolute z-10 top-0 left-0 right-0 bottom-0">
      <div className="flex items-center bg-black/40 p-4 justify-between">
        <div className="flex justify-between gap-4 hover:cursor-pointer" onClick={()=>router.push("/")}>
          <p className="text-4xl font-bold ">MINT</p>
        </div>
        <div >
          <WalletConnection /> 
        </div>
      </div>

    </header>
  )
}
