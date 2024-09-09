import axios from "axios";

async function getAsset(id: string) {
  try {
    const url =
      "https://mainnet.helius-rpc.com/?api-key=62c2c386-fc96-48e4-b3e0-188f9a370d8f";
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
      },
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching asset:", error);
  }
}

export default getAsset;
