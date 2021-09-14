import { getUserPools, getPoolTokens } from './helpers'

export const fetchUserBalancerPoolInfo = async (address) => {
    let poolInfo = await getUserPools(address);
    if (!poolInfo || poolInfo.length <= 0) return []
    let info = []
    for (let i = 0; i < poolInfo.length; i ++) {
        let pInfo = { poolName:'', balance: ''}
        let pNameArr = await getPoolTokens(poolInfo[i].poolId.id);
        let pNameStr = '';
        for (let j = 0; j < pNameArr.length; j ++) {
            pNameStr += pNameArr[j].symbol;
            pNameStr += '/';
        }
        pNameStr = pNameStr.slice(0, pNameStr.length - 1);
        pInfo.balance = poolInfo[i].balance;
        pInfo.poolName = pNameStr;
        info.push(pInfo);
    }
    return info;
}