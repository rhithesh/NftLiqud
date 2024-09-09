import { SwapCard } from "@/components/SwapComponent/SwapCard";

export default function Swap() {
  return (
    <div>
      Swap Page
      <div className="flex flex-reverse">
        <SwapCard id={"1"} />
      </div>
    </div>
  );
}
