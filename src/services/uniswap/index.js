import { getUserPools } from './helpers'

export const fetchUserUniswapPoolInfo = async (address) => {
    let info = await getUserPools(address);
    console.log(info)
    return info;
}