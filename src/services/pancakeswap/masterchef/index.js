// import { masterchefContractAddress } from 'constants/contractAddresses'
// import masterchefABI from 'abis/pancakeswap/masterchef.json'
// import multicall from 'utils/multicall'
// import BigNumber from 'bignumber.js'

// export const fetchFarmUserStakedBalances = async(account, farmsToFetch) => {
//     const calls = farmsToFetch.map((farm) => {
//         return {
//             address: masterchefContractAddress,
//             name: 'userInfo',
//             params: [farm.pid, account]
//         }
//     })

//     const rawStakedBalances = await multicall(masterchefABI, calls);
//     const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
//         return new BigNumber(stakedBalance[0]._hex).toJSON()
//     })
//     return parsedStakedBalances
// }
import { request, gql } from 'graphql-request'
import { GRAPH_API_PANCAKESWAP } from 'config'

export const fetchFarmUserStakedBalances = async (id) => {
    const response = await request(
      GRAPH_API_PANCAKESWAP,
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