interface SolanaProvider {
  connect: () => Promise<void>;
  publicKey: {
    toString: () => string;
  };
}

interface Window {
  solana?: {
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    isPhantom?: boolean;
  };
}
