// File: pages/index.js
import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { TensorSwap } from "@tensor-oss/typescript-sdk";
import { Jupiter } from "@jup-ag/core";

const Home = () => {
  const { publicKey, signTransaction } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [targetToken, setTargetToken] = useState("");
  const [liquidationResult, setLiquidationResult] = useState(null);
  const [swapResult, setSwapResult] = useState(null);

  useEffect(() => {
    if (publicKey) {
      fetchUserNFTs();
    }
  }, [publicKey]);

  const fetchUserNFTs = async () => {
    // Implement Tensor API call to fetch user's NFTs
    const fetchedNFTs = await TensorSwap.fetchNFTs(publicKey);
    setNfts(fetchedNFTs);
  };

  const handleNFTSelection = (nft) => {
    setSelectedNFT(nft);
  };

  const handleTokenSelection = (event) => {
    setTargetToken(event.target.value);
  };

  const liquidateNFT = async () => {
    if (!selectedNFT || !targetToken) return;

    try {
      // Implement Tensor API call to liquidate NFT
      const result = await TensorSwap.liquidateNFT(
        selectedNFT,
        targetToken,
        publicKey,
        signTransaction
      );
      setLiquidationResult(result);

      // Check if the received token matches the target token
      if (result.success && result.receivedTokens.mint !== targetToken) {
        // If tokens don't match, proceed with token swap
        await swapTokens(result.receivedTokens, targetToken);
      } else {
        // If tokens match, we're done
        setSwapResult({
          outputAmount: result.receivedTokens.amount,
          outputToken: result.receivedTokens.symbol,
        });
      }
    } catch (error) {
      console.error("Error liquidating NFT:", error);
    }
  };

  const swapTokens = async (sourceTokens, targetToken) => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const jupiter = await Jupiter.load({
        connection,
        cluster: "mainnet-beta",
        user: publicKey,
      });

      const routes = await jupiter.computeRoutes({
        inputMint: new PublicKey(sourceTokens.mint),
        outputMint: new PublicKey(targetToken),
        amount: sourceTokens.amount,
        slippageBps: 50,
      });

      const { execute } = await jupiter.exchange({
        routeInfo: routes.routesInfos[0],
      });

      const swapResult = await execute(signTransaction);
      setSwapResult(swapResult);
    } catch (error) {
      console.error("Error swapping tokens:", error);
    }
  };

  return (
    <div>
      <h1>NFT Liquidation and Token Swap</h1>
      <WalletMultiButton />
      {publicKey && (
        <>
          <h2>Your NFTs</h2>
          <ul>
            {nfts.map((nft) => (
              <li key={nft.mint} onClick={() => handleNFTSelection(nft)}>
                {nft.name}
              </li>
            ))}
          </ul>
          {selectedNFT && (
            <div>
              <h3>Selected NFT: {selectedNFT.name}</h3>
              <select onChange={handleTokenSelection}>
                <option value="">Select target token</option>
                <option value="SOL">SOL</option>
                <option value="USDC">USDC</option>
                {/* Add more token options */}
              </select>
              <button onClick={liquidateNFT}>Liquidate and Swap</button>
            </div>
          )}
          {liquidationResult && (
            <div>
              <h3>Liquidation Result</h3>
              <p>{liquidationResult.success ? "Success" : "Failed"}</p>
              {liquidationResult.success && (
                <p>
                  Received: {liquidationResult.receivedTokens.amount}{" "}
                  {liquidationResult.receivedTokens.symbol}
                </p>
              )}
            </div>
          )}
          {swapResult && (
            <div>
              <h3>Final Result</h3>
              <p>
                Received: {swapResult.outputAmount} {swapResult.outputToken}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
