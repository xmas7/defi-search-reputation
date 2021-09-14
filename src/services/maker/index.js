import { getUserPools } from './helpers'

export const fetchUserMakerPoolInfo = async (address) => {
    let info = await getUserPools(address);
    return info;
}