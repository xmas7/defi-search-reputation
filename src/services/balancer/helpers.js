import { request, gql } from 'graphql-request'
import { GRAPH_API_BALANCER } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_BALANCER,
      gql`
      query PoolShares($id: ID!) { 
          poolShares (first: 1000, where: {balance_gt:0, userAddress: $id}) { 
              poolId { 
                  id
              }
              balance 
            } 
        }
    `,
      { id },
    )
    return response.poolShares
  }

  export const getPoolTokens = async(id) => {
    const response = await request(
        GRAPH_API_BALANCER,
        gql`
        query PoolTokens($id: ID!) { 
            poolTokens(where: {poolId: $id}) {
                symbol
            }
          }
      `,
        { id },
      )
      return response.poolTokens
  }