import { request, gql } from 'graphql-request'
import { GRAPH_API_YEARN } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_YEARN,
      gql`
        query getData($id: ID!) {
          accountVaultPositions( where : {account : $id}) {
            token {
               symbol
               name
               decimals
            }
            balanceTokens
            vault {
              vaultDayData {
                tokenPriceUSDC
              }
            }
          }
        }
    `,
      { id },
    )
    return response.accountVaultPositions
  }