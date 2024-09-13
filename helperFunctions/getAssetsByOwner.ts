import axios from "axios";

const NEXT_PUBLIC_HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY as string;
const url = `https://mainnet.helius-rpc.com/?api-key=${NEXT_PUBLIC_HELIUS_API_KEY}`;

export const getAssetsByOwner = async (userAddress: string) => {
  try {
    const response = await axios.post(url, {
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: userAddress,
        page: 1,
        limit: 1000,
      },
    });

    const assets = response.data.result.items.map((item: any) => {
      const cdnUri = item.content.files[0]?.cdn_uri || "";
      const id = item.id;
      const title = item.content.metadata.name || "Unknown Title";
      const description = item.content.metadata.description || "No description";
      return { id, imageurl: cdnUri, title , description };
    });

    return assets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
};
