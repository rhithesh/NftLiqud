"use client";
import WalletConnection from "@/components/WalletConnection";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import TypingAnimation from "@/components/magicui/typing-animation";

export default function Page() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [pub, setpub] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setTimeout(() => {
        setpub(true);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  }, [publicKey]);

  return (
    <>
      <div className=" w-screen   h-[100vh] flex justify-center items-center ">
        {pub ? (
          <TypingAnimation
            className="  text-6xl font-bold bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text  text-transparent"
            text="Lets Go!"
          />
        ) : (
          <div className=" space-y-4">
            <h1 className=" text-3xl ">My public key is </h1>
            <WalletConnection />
          </div>
        )}
      </div>
    </>
  );
}
