import { getUserPools } from './helpers'

export const fetchUserMdexPoolInfo = async (address) => {
    let info = await getUserPools(address);
    return info;
}