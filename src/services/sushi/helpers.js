import { request, gql } from 'graphql-request'
import { GRAPH_API_SUSHI } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_SUSHI,
      gql`
        query Users($id: Bytes!){
          user(id: $id) {
            id
            liquidityPositions {
              liquidityTokenBalance
              pair {
                name
                token0 {
                  symbol
                }
                token1 {
                  symbol
                }
              }
            }
          }
        }
    `,
      { id },
    )
    return response.user
  }