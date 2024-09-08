type NftItem = {
  imageUrl: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  price: number;
};

const nftItems: NftItem[] = [
  {
    imageUrl:
      "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/7604.png",
    title: "Cosmic Perspective #42",
    creator: "AstroArtist",
    creatorAvatar: "/placeholder.svg?height=50&width=50",
    price: 0.5,
  },
  {
    imageUrl:
      "https://bafybeicz4djcpqkhzq5omjkdmx54f5zur7xuwzbkoi5zvibcrflltzokd4.ipfs.w3s.link/249.png",
    title: "Galactic Horizons #15",
    creator: "StarGazer",
    creatorAvatar: "/placeholder.svg?height=50&width=50",
    price: 0.8,
  },
  {
    imageUrl:
      "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/9170.png",
    title: "Nebula Dreams #7",
    creator: "NebulaCreator",
    creatorAvatar: "/placeholder.svg?height=50&width=50",
    price: 1.2,
  },
  {
    imageUrl:
      "https://bafybeicz6y4szvtaycgshstnsdihqumslzc5fgpzweekc3hvvg5nbe4bsa.ipfs.w3s.link/8739.png",
    title: "Stellar Visions #88",
    creator: "CosmicPainter",
    creatorAvatar: "/placeholder.svg?height=50&width=50",
    price: 0.9,
  },
  {
    imageUrl:
      "https://bafybeias6sokri7svdrfiyxoewjv724lyusblnd6dwqm3kiw3wz6vorqoa.ipfs.w3s.link/2570.png",
    title: "Astral Odyssey #23",
    creator: "SpaceExplorer",
    creatorAvatar: "/placeholder.svg?height=50&width=50",
    price: 0.75,
  },
] as const;

export default nftItems;
