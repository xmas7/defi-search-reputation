import { request, gql } from 'graphql-request'
import { GRAPH_API_COMPOUND } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_COMPOUND,
      gql`
        query MintEvents($id: Bytes!) {
          mintEvents(where: {to: $id}) {
            amount
            cTokenSymbol
          }
        }
    `,
      { id },
    )
    return response.mintEvents
}

export const getTokenPrice = async(id) => {
    const response = await request(
      GRAPH_API_COMPOUND,
      gql`
        query Markets($id: String!) {
          markets(where: {symbol: $id}) {
            underlyingPriceUSD
            exchangeRate
          }
        }
      `,
      { id },
    )
    return response.markets;
}