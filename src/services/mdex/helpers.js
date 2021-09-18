import config from './mdexconfig';
import multicall from 'utils/multicall'
import { getWeb3BSCNoAccount } from 'utils/web3';
import BigNumber from 'bignumber.js'
import { request, gql } from 'graphql-request'
import { GRAPH_API_PANCAKESWAP } from 'config'

export const getUserPools = async (acc) => {
    let lpAddresses = await getLptokenAddresses();
    const web3 = getWeb3BSCNoAccount();
    let return_val = []
    let len = lpAddresses.length;
    const calls = lpAddresses.map((lpAddress) => {
        return {
            address: lpAddress[0],
            name: 'balanceOf',
            params: [acc]
        }
    })
    const rawStakedBalances = await multicall(config.mdexLPTokenABI, calls);
    const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
        return new BigNumber(stakedBalance[0]._hex).toJSON()
    })
    for(let i = 0 ; i < len; i++){
        if (parsedStakedBalances[i] !== "0" && parsedStakedBalances[i].length > 0) {
          let lp_address = lpAddresses[i][0];
          let lpContract = new web3.eth.Contract(config.mdexLPTokenABI, lp_address);
          console.log(lp_address);
          let token0Address = await lpContract.methods.token0().call();
          let token1Address = await lpContract.methods.token1().call();
          let poolReserved = await lpContract.methods.getReserves().call();
          let poolTotalSupply = await lpContract.methods.totalSupply().call();
          let lpTokenDecimals = await lpContract.methods.decimals().call();
          let token0price = await fetchTokenPrice(token0Address.toLowerCase());
          let token0priceBigNumber = new BigNumber(token0price[0].derivedUSD);
          let reserve0BigNumber = new BigNumber(poolReserved._reserve0);
          let totalSupplyBigNumber = new BigNumber(poolTotalSupply);

          let lptokenPrice = token0priceBigNumber.multipliedBy(reserve0BigNumber)
                                .multipliedBy(2).div(totalSupplyBigNumber);

          let amountUSD = lptokenPrice.multipliedBy(new BigNumber(parsedStakedBalances[i]))
                                        .div(new BigNumber(10).pow(lpTokenDecimals));

          let token0Contract = new web3.eth.Contract(config.erc20ABI, token0Address);
          let token0Symbol = await token0Contract.methods.symbol().call();
          let token1Contract = new web3.eth.Contract(config.erc20ABI, token1Address);
          let token1Symbol = await token1Contract.methods.symbol().call();
          let pool_info = {
            name: token0Symbol + "/" + token1Symbol + " Pool",
            symbol: token0Symbol + "/" + token1Symbol,
            balance: parsedStakedBalances[i],
            amountUSD: amountUSD.toString()
          }
          return_val.push(pool_info);
        }
    }
    return return_val;
  }

  export const getLptokenAddresses = async () => {
    const web3 = getWeb3BSCNoAccount();
    let factoryContract = new web3.eth.Contract(config.mdexFactoryABI, config.mdexFactoryAddress);
    let allPairsLength = await factoryContract.methods.allPairsLength().call();
    let pairNos = []
    for (let i = 0; i < allPairsLength; i ++) 
        pairNos.push(i)
    const calls = pairNos.map((index) => {
        return {
            address: config.mdexFactoryAddress,
            name: 'allPairs',
            params: [index]
        }
    })

    const lpAddresses = await multicall(config.mdexFactoryABI, calls);
    return lpAddresses
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