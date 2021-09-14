import { request, gql } from 'graphql-request'
import { GRAPH_API_MAKER } from 'config'

export const getUserPools = async (id) => {
    const response = await request(
      GRAPH_API_MAKER,
      gql`
        query getPool($id: Bytes!) {
          users (where : {address : $id}){
            vaults{
              collateralType{
                id
              }
              collateral
              debt
            }
          }
        }
    `,
      { id },
    )
    return response.users
  }