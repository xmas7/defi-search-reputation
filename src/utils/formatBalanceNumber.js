import BigNumber from 'bignumber.js'

export const BIG_TEN = new BigNumber(10)

export const getBalanceAmount = (amount, decimals = 18) => {
    return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}
  

export const getBalanceNumber = (balance, decimals = 18) => {
    return getBalanceAmount(balance, decimals).toNumber()
}