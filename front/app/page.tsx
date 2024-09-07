import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link"

export default function BorderBeamDemo() {
  return (
    <div className="relative m-5 flex overflow-hidden h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Nft Liquidate
      </span>
      <button className="my-11">
      <Link href="/letsgo">
      Lets Go->
      </Link>
      </button>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
