
import { getWeb3ETHNoAccount } from 'utils/web3';
import { Mainnetconfig } from './instaconfig'
import DSA from 'dsa-connect'
export const getUserPools = async (id) => {
  const web3 = getWeb3ETHNoAccount();
  const dsa = new DSA(web3);
  let dsaAccounts = await dsa.getAccounts(id);
  console.log(dsaAccounts)
  let dsaAddresses = dsaAccounts.map(account=> account.address);
  let dsaIds = dsaAccounts.map(account=>account.id);
  let stakingInfo = [];
  for(let i = 0; i < dsaAddresses.length ; i++){
    let _dsaAddress = dsaAddresses[i];
    //insta pool
    let insta = await getInstaPools(_dsaAddress);
    stakingInfo = stakingInfo.concat(insta);
  }
  return stakingInfo;
}

const getInstaPools = async(address) => {
  let stakingInfo = []
  let api_url = "https://api.instadapp.io/defi/guniswap/v3/position?user=" + address;
  let res = await fetch(api_url);
  let result = await res.json();
  for(let j = 0; j < result.length; j ++) {
    let stakingInsta = {
      "symbol" : result[j].tokenA.symbol + "-" + result[j].tokenB.symbol,
      "name" : result[j].tokenA.symbol + "-" + result[j].tokenB.symbol + " Insta",
      "balance" : result[j].stakedPoolTokenBalance
    };
    stakingInfo.push(stakingInsta);
  }
  return stakingInfo;
}