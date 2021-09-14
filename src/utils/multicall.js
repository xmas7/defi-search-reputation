import { Interface } from '@ethersproject/abi'
import { getWeb3BSCNoAccount } from 'utils/web3'
import MultiCallAbi from 'abis/pancakeswap/multicall.json'
import { multicallContractAddress } from 'constants/contractAddresses'

const multicall = async (abi, calls) => {
  const web3 = await getWeb3BSCNoAccount()
  const multi = new web3.eth.Contract(MultiCallAbi, multicallContractAddress)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}

export default multicall
