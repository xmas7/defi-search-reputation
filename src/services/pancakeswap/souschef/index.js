import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import poolsConfig from 'constants/pools'
import sousChefABI from 'abis/pancakeswap/sousChef.json'
import Web3 from 'web3'
import { masterchefContractAddress } from 'constants/contractAddresses'
import masterchefABI from 'abis/pancakeswap/masterchef.json'
import { getWeb3BSCNoAccount } from 'utils/web3'
import { request, gql } from 'graphql-request'
import { GRAPH_API_PANCAKESWAP } from 'config'

export const fetchUserStakeBalances = async (account) => {
    const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
    const web3 =await getWeb3BSCNoAccount()
    const masterChefContract = new web3.eth.Contract(masterchefABI, masterchefContractAddress)
    const calls = nonMasterPools.map((p) => ({
      address: p.contractAddress['56'],
      name: 'userInfo',
      params: [account],
    }))
    const userInfo = await multicall(sousChefABI, calls)
    const stakedBalances = nonMasterPools.reduce(
      (acc, pool, index) => ({
        ...acc,
        [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
      }),
      {},
    )
  
    // Cake / Cake pool
    const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()
  
    return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
  }

  export const fetchTokenPrice = async (id) => {
    const response = await request(
      GRAPH_API_PANCAKESWAP,
      gql`
        query Tokens($id: Bytes!){
          tokens(where: {id: $id}) {
            derivedUSD
          }
        }
    `,
      { id },
    )
    return response.tokens
}