import { request, gql } from 'graphql-request'
import { GRAPH_API_UNISWAP } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_UNISWAP,
      gql`
        query Mints($id: Bytes!){
          mints(where: {to: $id}) {
            liquidity
            amountUSD
            pair {
              token0 {
                symbol
              }
              token1 {
                symbol
              }
            }
          }
        }
    `,
      { id },
    )
    return response.mints
  }