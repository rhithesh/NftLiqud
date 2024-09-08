"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter"
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");


const TIPLINK_CLIENT_ID = process.env.TIPLINK_CLIENT_ID as string; 

// Custom RPC endpoint (replace with your actual endpoint if needed)
const CUSTOM_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  "https://mainnet.helius-rpc.com/?api-key=eda96028-2abb-4f07-9ac9-50b28d3fd10e";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  console.log("Network:", network);

  const endpoint = useMemo(() => {
    const selectedEndpoint = CUSTOM_RPC_ENDPOINT || clusterApiUrl(network);
    console.log("Selected endpoint:", selectedEndpoint);
    return selectedEndpoint;
  }, [network]);

  const wallets = useMemo(
    () => [

      new TipLinkWalletAdapter({
        title: "NFT",
        clientId: TIPLINK_CLIENT_ID,
        theme: "dark",
      })

    ],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
