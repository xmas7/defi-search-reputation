import { getUserPools } from './helpers'

export const fetchUserCurvePoolInfo = async (address) => {
    let info = await getUserPools(address);
    return info;
}