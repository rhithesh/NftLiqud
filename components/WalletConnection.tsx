"use client";
import { WalletName } from "@solana/wallet-adapter-base";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { FaWallet } from "react-icons/fa";

const WalletConnection = () => {
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);


  const handleWalletSelect = async (walletName: WalletName) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("Wallet connection error:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div className="text-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {!publicKey ? (
            <DialogTrigger asChild>
              <Button>
                {connecting ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  <FaWallet />
                )}
              </Button>
            </DialogTrigger>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=" text-white border px-3 py-2 flex items-center space-x-2 transition duration-200 ease-in-out">

                  <span className=" text-sm">{`${publicKey.toBase58().slice(0, 4)}...${publicKey
                    .toBase58()
                    .slice(-4)}`}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border rounded-lg">
                <DropdownMenuItem>
                  <button
                    onClick={handleDisconnect}
                    className="w-full bg-black font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                  >
                    Disconnect
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent className="bg-black border border-white rounded-xl shadow-2xl max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              Select a Wallet
            </h2>
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  className="w-full flex items-center space-x-3 bg-black hover:bg-gray-700 text-white rounded-lg p-3 transition duration-150 ease-in-out"
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <span className="font-medium">{wallet.adapter.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
