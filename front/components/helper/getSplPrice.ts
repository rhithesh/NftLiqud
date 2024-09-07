"use server";
"use strict";

export default async function getTokenPrice<T>(tokenName: string): Promise<T> {
  const address: string = `https://price.jup.ag/v6/price?ids=${tokenName}`;

  const res = await fetch(address, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
