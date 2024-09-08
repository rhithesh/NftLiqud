"use client";
import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
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
const toFixed = (num: number, fixed: number): string => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
};

const WalletConnection = () => {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!connection || !publicKey) return;

    const fetchAccountInfo = async () => {
      try {
        const info = await connection.getAccountInfo(publicKey);
        if (info) {
          setBalance(info.lamports / LAMPORTS_PER_SOL);
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
                <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-700 transition duration-200 ease-in-out">
                  <span>{`${publicKey.toBase58().slice(0, 4)}...${publicKey
                    .toBase58()
                    .slice(-4)}`}</span>
                  <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                    {balance ? `${toFixed(balance, 2)} SOL` : "0 SOL"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                <DropdownMenuItem>
                  <button
                    onClick={handleDisconnect}
                    className="w-full text-red-400 hover:text-red-300 font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                  >
                    Disconnect
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              Select a Wallet
            </h2>
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  className="w-full flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3 transition duration-150 ease-in-out"
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
