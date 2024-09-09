import { gql } from "@apollo/client";

interface QueryData {
  slug: string;
  sortBy: string;
  filters: { string: string[] };
  limit: number;
  cursor: null | number | boolean | string;
}

export async function GetQueryBySlug(queryData: QueryData) {
  const { slug, sortBy, filters, limit, cursor } = queryData;
  let res = await gql`
    query ActiveListingV2(
      $slug: String!
      $sortBy: ActiveListingsSortBy!
      $filters: ActiveListingsFilters!
      $limit: Int
      $cursor: ActiveListingsCursorInputV2
    ) {
      activeListingsV2(
        slug: ${slug}
        sortBy: ${sortBy}
        filters: ${filters}
        limit: ${limit}
        cursor: ${cursor}
      ) {
        page {
          endCursor {
            str
          }
          hasMore
        }
        txs {
          mint {
            onchainId
          }
          tx {
            sellerId
            grossAmount
            grossAmountUnit
          }
        }
      }
    }
  `;
  return res;
}

//Listen to pool updates every time a pool’s buy/sell now price is changed, NFTs are deposited/withdrawn, or a pool is opened/closed/edited.
//If `pool = null` then it means the pool has been closed.
export async function TswapOrderUpdateAll(Address: string | number) {
  const address = Address;
  let res = await gql`
        subscription TswapOrderUpdateAll($address: String!) {
            tswapOrderUpdateAll(address: ${address}) {
                address
                pool {
                    address
                    createdUnix
                    curveType
                    delta
                    mmCompoundFees
                    mmFeeBps
                    nftsForSale {
                        onchainId
                    }
                    nftsHeld
                    ownerAddress
                    poolType
                    solBalance
                    startingPrice
                    buyNowPrice
                    sellNowPrice
                    statsAccumulatedMmProfit
                    statsTakerBuyCount
                    statsTakerSellCount
                    takerBuyCount
                    takerSellCount
                    updatedAt
                }
                slug
            }
        }
    `;
  return res;
}

//Fetch all marketplace mint listings (TensorSwap, TComp, HyperSpace, ME, etc.) for a wallet.
export async function GetNftData(t) {
  let res = await gql`
    query Mints($tokenMints: [String!]!) {
      mints(tokenMints: $tokenMints) {
        slug
      }
    }
  `;
  return res;
}

//sell nft now
export async function HswapSellNftTx(
  mathCounter: number,
  minPriceLamports: number,
  mint: string,
  pair: string,
  seller: string
) {
  let res = await gql`
    query HswapSellNftTx(
      $mathCounter: Float!
      $minPriceLamports: Decimal!
      $mint: String!
      $pair: String!
      $seller: String!
    ) {
      hswapSellNftTx(
        mathCounter: $mathCounter
        minPriceLamports: $minPriceLamports
        mint: $mint
        pair: $pair
        seller: $seller
      ) {
        txs {
          lastValidBlockHeight
          tx
          txV0 # If this is present, use this!
        }
      }
    }
  `;
  return res;
}

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TENSOR_API_KEY}`,
  },
});
