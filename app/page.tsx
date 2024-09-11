import { ConnectionSection } from "@/components/globals/ConnectSection";
import { Hero } from "@/components/globals/Hero";
import { Slider } from "@/components/globals/Slider";
import SlideShow from "@/components/globals/SlideShow";
import { TokenShow } from "@/components/globals/TokenShow";
export default function Home() {
  return (<main className="min-h-screen mx-auto">
    <section className="mt-[7rem] px-4 ">
      <Hero />
    </section>
    <section>
      <Slider />
    </section>
    <article className="flex flex-col items-center justify-center mt-20 px-4">
      <h1 className="font-mono font-extrabold text-3xl md:text-4xl lg:text-5xl">
        Fastest swaps and liquidaton on Solana
      </h1>
      <p className="font-semibold text-xs md:text-sm text-white mt-4 border-2 border-black shadow-lg shadow-orange-300 mb-20 p-2 px-4 bg-orange-400 rounded-3xl lg:text-base font-mono">
        Uses the power of Tensor marketplace and Jupiter&apos;s Dex features
        to provide you the best price for your NFT{" "}
      </p>
    </article>
    <SlideShow message="Liquidate Now" />
    <ConnectionSection />
    <section className="border-b-2 border-t-2 border-black flex items-center justify-center">
      <p className=" font-bold text-lg md:text-xl p-2 lg:text-2xl">
        Get The Best Conversion Rate
      </p>
    </section>
    <TokenShow />
  </main>
  );
} 
