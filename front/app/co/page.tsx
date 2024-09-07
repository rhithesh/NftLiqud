"use client";
import NftDisplay from "@/components/NftDisplay";
import nftItems from "@/data/Nftmap";

export default function Page() {
  return (
    <div className=" w-[100vw] h-screen  ">
      <div className=" my-6 mx-10 h-[50px] border-2 border-cyan-900">
        <h1 className=" m-2">Your NFTS</h1>
      </div>

      <div className=" mx-10 flex flex-wrap gap-10">
        {nftItems.map((e) => {
          return <NftDisplay {...e} key={1} />;
        })}
      </div>
    </div>
  );
}
