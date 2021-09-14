import { getUserPools } from './helpers'

export const fetchUserYearnPoolInfo = async (address) => {
    let info = await getUserPools(address);
    return info;
}