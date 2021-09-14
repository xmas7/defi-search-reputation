import Web3 from 'web3'
import { getBSCRpcUrl, getETHRpcUrl } from 'utils/getRpcUrl'


const BSC_RPC_URL = getBSCRpcUrl()
// const httpBSCProvider = new Web3.providers.HttpProvider(BSC_RPC_URL, { timeout: 10000 })
// const web3BSCNoAccount = new Web3(httpBSCProvider)

const ETH_RPC_URL = getETHRpcUrl()
// const httpETHProvider = new Web3.providers.HttpProvider(ETH_RPC_URL, { timeout: 10000 })
// const web3ETHNoAccount = new Web3(httpETHProvider)

var web3 = new Web3(BSC_RPC_URL);

const getWeb3BSCNoAccount = () => {
  web3.setProvider(BSC_RPC_URL);
  return web3
}

const getWeb3ETHNoAccount = () => {
  web3.setProvider(ETH_RPC_URL)
  return web3;
}

export { getWeb3BSCNoAccount, getWeb3ETHNoAccount }
export default web3
