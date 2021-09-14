import { getUserPools, getTokenPrice } from './helpers'

export const fetchUserCompoundPoolInfo = async (address) => {
    let info = await getUserPools(address);
    let result = [];
    if (info != null) {
        for (let i = 0; i < info.length; i ++) {
            let symbol = info[i].cTokenSymbol;
            let price = await getTokenPrice(symbol);
            result.push({amount: info[i].amount, symbol: info[i].cTokenSymbol, price: price[0].underlyingPriceUSD * price[0].exchangeRate});
        }
    }
    return result;
}