const a = async () => {
  const response = await fetch(
    "https://mainnet.helius-rpc.com/?api-key=eda96028-2abb-4f07-9ac9-50b28d3fd10e",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "text",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: "H1V3XkxhGuADph1ajAWmTjwUcY6Y8EVX3PfXosdsP2JM",
          page: 1,
        },
      }),
    },
  );

  if (response.ok) {
    const data = await response.json();
    const items = data.result.items; // Access the items
    console.log(items); // Log the items
  } else {
    console.error("Error:", response.status, response.statusText);
  }
};

a();
