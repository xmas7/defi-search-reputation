import { getUserPools } from './helpers'

export const fetchUserSushiPoolInfo = async (address) => {
    let info = await getUserPools(address);
    return info;
}