import random from 'lodash/random'

// Array of available nodes to connect to
export const bscnodes = ["https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed.binance.org"]
export const ethnodes = [ "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"];

const getBSCRpcUrl = () => {
  const randomIndex = random(0, bscnodes.length - 1)
  return bscnodes[randomIndex]
}

const getETHRpcUrl = () => {
  const randomIndex = random(0, ethnodes.length - 1)
  return ethnodes[randomIndex]
}

export { getBSCRpcUrl, getETHRpcUrl }
export default getBSCRpcUrl
