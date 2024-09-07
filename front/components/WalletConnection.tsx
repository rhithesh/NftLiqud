"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import ShimmerButton from "@/components/magicui/shimmer-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

const WalletConnection = () => {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    const fetchAccountInfo = async () => {
      try {
        const info = await connection.getAccountInfo(publicKey);
        if (info) {
          setBalance(info.lamports / LAMPORTS_PER_SOL);
          console.log(publicKey);
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    const handleAccountChange = (updatedAccountInfo: any) => {
      setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
    };

    connection.onAccountChange(publicKey, handleAccountChange, "confirmed");
    fetchAccountInfo();

    return () => {
      connection.removeAccountChangeListener(publicKey, handleAccountChange);
    };
  }, [publicKey, connection]);

  useEffect(() => {
    if (publicKey) {
      setUserWalletAddress(publicKey?.toBase58());
    }
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("wallet connection error:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  return (
    <div className="text-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {!publicKey ? (
            <DialogTrigger asChild>
              <ShimmerButton className="shadow-2xl py-8 mr-4 max-h-[40px]">
                <span className="text-white whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 lg:text-lg">
                  {connecting ? "connecting..." : "Connect Wallet"}
                </span>
              </ShimmerButton>
            </DialogTrigger>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mt-4 z-50">
                  <div className="">
                    <div className="!hover:bg-none">
                      {publicKey.toBase58().slice(0, 6)}....
                      {publicKey.toBase58().slice(26, 32)}{" "}
                    </div>
                  </div>
                  {balance ? (
                    <div className="mx-10">{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div className="mx-10">0 SOL</div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] bg-black hover:bg-black">
                <DropdownMenuItem className="flex justify-center">
                  <Button
                    className="bg-[#ff5555] z-50 text-[20px] text-white border-2 border-white font-slackey"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent
            className="max-w-[450px] bg-black"
            style={{
              borderRadius: "30px",
            }}
          >
            <div className="flex justify-center items-center !w-[300px] bg-black">
              <div className="flex flex-col justify-start items-center space-y-5 overflow-y-auto">
                {wallets.map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                    variant={"ghost"}
                    className="h-[40px] hover:bg-transparent hover:text-white text-[20px] text-white font-slackey flex w-full justify-center items-center"
                  >
                    <div className="flex">
                      <Image
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        height={30}
                        width={30}
                        className="mr-5"
                      />
                    </div>
                    <div className="font-slackey text-white wallet-name text-[20px]">
                      {wallet.adapter.name}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
