import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Nft1 from "@/public/1nft.png";
import Nft2 from "@/public/2nft.png";
import Nft3 from "@/public/3nft.png";
import Nft4 from "@/public/4nft.png";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "NFT NAME",
    background: (
      <Image
        src={Nft2}
        width={500}
        height={500}
        className="absolute  h-full "
      />
    ),
    className:
      "lg:row-start-1 lg:row-end-5 lg:col-start-2 lg:col-end-3 sm:row-span-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "NFT NAME",
    background: (
      <Image src={Nft3} width={500} height={300} className="absolute  " />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 sm:row-span-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "NFT NAME",
    background: <Image src={Nft1} width={500} className="absolute  " />,
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5 sm:row-span-3",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "NFT NAME",
    background: (
      <Image src={Nft4} width={500} height={500} className="absolute h-fit  " />
    ),
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-5 sm:row-span-3",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "NFT NAME",
    background: <Image src={Nft1} width={500} className="absolute !mb-56  " />,
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2   sm:row-span-3",
  },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-5 grid grid-rows-5 grid-cols-3 mt-2  px-6 ">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
