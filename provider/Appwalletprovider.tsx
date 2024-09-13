"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

const NEXT_PUBLIC_HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY as string;

const CUSTOM_RPC_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${NEXT_PUBLIC_HELIUS_API_KEY}`;


export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    const selectedEndpoint = CUSTOM_RPC_ENDPOINT || clusterApiUrl(network);
    return selectedEndpoint;
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
