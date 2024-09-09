"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WalletConnection from "../WalletConnection";

export function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const TOP_OFFSET = 66;
  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handelScroll);

    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);
  const router = useRouter();
  return (
    <header className="fixed z-20 top-0 left-0 right-0 bottom-0">
      <div
        className={`px-4 flex justify-between md:px16 py-4 flex flex-row items-center transition duration-500 ${showBackground ? `bg-zinc-950/90` : ""
          }`}
      >
        <div className="flex justify-between gap-4 hover:cursor-pointer" onClick={() => router.push("/")}>
          <p className="text-4xl text-white font-bold ">MINT</p>
        </div>
        <div >
          <WalletConnection />
        </div>
      </div>

    </header>
  )
}
