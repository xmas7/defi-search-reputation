import { getUserPools } from './helpers'

export const fetchUserInstaPoolInfo = async (address) => {
    let info = await getUserPools(address);
    console.log(info.length)
    return info;
}