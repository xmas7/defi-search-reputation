import { getUserPools } from './helper'

export const fetchUserVenusPoolInfo = async (address) => {
    let info = await getUserPools(address);
    // info = [{balance: "ad", symbol: 'aa', decimals:8, name : "aa"}];
    return info;
}