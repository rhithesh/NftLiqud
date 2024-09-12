import axios from "axios";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY as string
async function getAsset(id: string) {
  try {
    const url =
      `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    const response = await axios.post(
      url,
      {
        jsonrpc: "2.0",
        id: id,
        method: "getAsset",
        params: {
          id: id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    const assets = response.data.result.items.map((item: any) => {
      const cdnUri = item.content.files[0]?.cdn_uri || "";
      const id = item.id;
      const name = item.content.metadata.name || "Unknown Title";
      const description = item.content.metadata.description || "No description";
      return { id, imageurl: cdnUri, name, description };
    });
    return assets;
  } catch (error) {
    console.error("Error fetching asset:", error);
  }
}

export default getAsset;
