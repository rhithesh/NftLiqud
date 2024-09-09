"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter"
require("@solana/wallet-adapter-react-ui/styles.css");


const TIPLINK_CLIENT_ID = process.env.TIPLINK_CLIENT_ID as string;
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY as string

const CUSTOM_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

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

  const wallets = useMemo(
    () => [

      new TipLinkWalletAdapter({
        title: "NFT",
        clientId: TIPLINK_CLIENT_ID,
        theme: "dark",
      })

    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
