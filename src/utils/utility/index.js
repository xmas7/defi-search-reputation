import BigNumber from 'bignumber.js'
const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const delay = ms => new Promise(res => setTimeout(res, ms));
const multiplyArray = (numbers) => numbers.reduce((total, n) => total * n, 1)
const sumArray = (numbers) => numbers.reduce((total, n) => total + Number(n), 0)
const sumArrayBn = (bigNumbers) => BigNumber.sum.apply(null, bigNumbers)

export {
  isEmpty,
  delay,
  sumArray
};
