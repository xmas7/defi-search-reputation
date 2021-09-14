import async from 'async'
import { getWeb3ETHNoAccount } from 'utils/web3';
import config from './curveconfig';
import BigNumber from 'bignumber.js'


import { request, gql } from 'graphql-request'
import { GRAPH_API_CURVE } from 'config'


export const getUserPools = async (id) => {
  let res_data = await getLptokenAddresses();
  const web3 = getWeb3ETHNoAccount();
  let len = res_data.length;
  let return_val = []
  for(let i = 0 ; i < len; i++){
    let lp_address = res_data[i].address;
    let erc20contract = new web3.eth.Contract(config.erc20ABI, lp_address);
    let _balance = await erc20contract.methods.balanceOf(id).call();
    let pool_name = res_data[i].name;
    let pool_symbol = res_data[i].symbol;
    let _decimals = res_data[i].decimals
    let _price = res_data[i].pool?res_data[i].pool.virtualPrice : 0;
    let _temp = {'name': pool_name, "symbol" : pool_symbol, "balance" : _balance, "decimals" : _decimals, "price": _price };
    return_val.push(_temp);
  }
  return return_val;
}
// return val = [{name:'', symbol:'', adress:''}, ...]
export const getLptokenAddresses = async () => {
    const response = await request(
      GRAPH_API_CURVE,
      gql` query{ 
        lpTokens {
              address
              name
              symbol
              decimals
              pool {
                virtualPrice
              }
        }
      }`
      ,{},
    )
    return response.lpTokens
  }
