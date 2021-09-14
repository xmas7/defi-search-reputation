import async from 'async'
import { getWeb3ETHNoAccount, getWeb3BSCNoAccount } from 'utils/web3';
import * as config from './constants';
import BigNumber from 'bignumber.js'


const TOKEN_ABI = {
    sxp: config.CONTRACT_SXP_TOKEN_ABI,
    usdc: config.CONTRACT_USDC_TOKEN_ABI,
    usdt: config.CONTRACT_USDT_TOKEN_ABI,
    busd: config.CONTRACT_BUSD_TOKEN_ABI,
    xvs: config.CONTRACT_XVS_TOKEN_ABI,
    btcb: config.CONTRACT_BTCB_TOKEN_ABI,
    eth: config.CONTRACT_ETH_TOKEN_ABI,
    ltc: config.CONTRACT_LTC_TOKEN_ABI,
    xrp: config.CONTRACT_XRP_TOKEN_ABI,
    bch: config.CONTRACT_BCH_TOKEN_ABI,
    dot: config.CONTRACT_DOT_TOKEN_ABI,
    link: config.CONTRACT_LINK_TOKEN_ABI,
    dai: config.CONTRACT_DAI_TOKEN_ABI,
    fil: config.CONTRACT_FIL_TOKEN_ABI,
    beth: config.CONTRACT_BETH_TOKEN_ABI,
    ada: config.CONTRACT_ADA_TOKEN_ABI,
    doge: config.CONTRACT_DOGE_TOKEN_ABI
  };

export const getUserPools = async (id) => {
    let assetList = [];
    let account = id;
    let _result = []
    for (let index = 0 ; index < Object.values(config.CONTRACT_TOKEN_ADDRESS).length; index++){
        const item = Object.values(config.CONTRACT_TOKEN_ADDRESS)[index];
        let tokencontract = null;
        let tokenDecimal = item.decimals;
        let vBepContract = getVbepContract(item.id);
        const _supplyBalance = await vBepContract.methods.balanceOfUnderlying(`${account}`).call();
        let supplyBalance = new BigNumber(_supplyBalance).div(
        new BigNumber(10).pow(tokenDecimal)
        );
        let _temp = {name: item.symbol, symbol: item.symbol, balance: supplyBalance.toString()}
        _result.push(_temp)
    }
    return _result

}

export const getVbepContract = name => {
    let web3 = getWeb3BSCNoAccount();;
    return new web3.eth.Contract(
      JSON.parse(
        name !== 'bnb' ? config.CONTRACT_VBEP_ABI : config.CONTRACT_VBNB_ABI
      ),
      config.CONTRACT_VBEP_ADDRESS[name].address
        ? config.CONTRACT_VBEP_ADDRESS[name].address
        : config.CONTRACT_VBEP_ADDRESS.usdc.address
    );
  };

