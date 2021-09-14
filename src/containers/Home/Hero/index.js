import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';

import CustomizedTable from 'components/UI/Table';
import SectionHeader from 'components/UI/SectionHeader';
import SearchAddress from 'components/UI/SearchAddress';
import { fetchFarmUserStakedBalances } from 'services/pancakeswap/masterchef';
import { fetchUserStakeBalances, fetchTokenPrice } from 'services/pancakeswap/souschef'
import { fetchUserUniswapPoolInfo } from 'services/uniswap';
import { fetchUserCompoundPoolInfo } from 'services/compound';
import { fetchUserVenusPoolInfo } from 'services/venus';
import { fetchUserCurvePoolInfo } from 'services/curve';
import { fetchUserSushiPoolInfo } from 'services/sushi';
import { fetchUserYearnPoolInfo } from 'services/yearn';
import { fetchUserMakerPoolInfo } from 'services/maker';
import { fetchUserInstaPoolInfo } from 'services/insta';
import { fetchUserBalancerPoolInfo } from 'services/balancer';
import { fetchUserMdexPoolInfo } from 'services/mdex';
import { useSnackbar } from 'notistack';
import farmsConfig from 'constants/farms'
import poolsConfig from 'constants/pools'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalanceNumber'
import CoinMarketCapAPI from 'coinmarketcap-api'


const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    boxShadow:
      '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      marginBottom: 60
    },
  },
  mobileImageContainer: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute', left: 0, marginTop: 80,
    },
    position: 'absolute', right: 0, marginTop: 80,
  },
  buyMarsButton: {
    backgroundColor: theme.palette.error.light
  }
}));

const Hero = props => {
  const {  account,chainId, library, className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [farmRows, setFarmRows] = React.useState([]);
  const [poolRows, setPoolRows] = React.useState([]);
  const [curIdentifier, setCurIdentifier] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  function createData(type, name, balance, balanceUSD = 0) {
    return {type, name, balance, balanceUSD};
  }

  const handleChangeIdentifer = (identifier) => {
    setCurIdentifier(identifier);
    setPoolRows([]);
    setFarmRows([]);
  }

  const handleSearch = async(identifier) => {
    if (!account) {
      enqueueSnackbar('Connect to the wallet first', { variant: 'warning' })
      return;
    }
    console.log(identifier)

    if (identifier === 'MDex') {
      let rows = [];
      let acc = account;
      let userPoolInfo = await fetchUserMdexPoolInfo(acc.toLowerCase()); //"'0x67525DDAFD3e3DF5BE9a0a951A4e7Ff91C1e4609'"
      console.log(userPoolInfo);
      if(userPoolInfo.length > 0){
        userPoolInfo.map((pooldata) =>{
          if(pooldata.balance >0) {
            let balance = pooldata.balance;
            let symbol = pooldata.symbol;
            let name = pooldata.name;
            rows.push(createData(name, symbol, web3.utils.fromWei(balance,'ether')))
          }
        })
      }
      setPoolRows(rows);
    }

    if (identifier === 'Balancer') {
      let acc = account; // 0x67525ddafd3e3df5be9a0a951a4e7ff91c1e4609
      let userPoolInfo = await fetchUserBalancerPoolInfo(acc.toLowerCase());
      let rows = []
      if(userPoolInfo.length > 0){
        userPoolInfo.map((pooldata) =>{
          if(pooldata.balance > 0) {
            let balance = pooldata.balance;
            let symbol = pooldata.poolName;
            let name = pooldata.poolName + " POOL";
            rows.push(createData(name, symbol, balance))
          }
        })
      }
      setPoolRows(rows);
    }
    if (identifier === 'Insta') {
      let _account = account;
      let _acc = _account.toLowerCase()
      let userPoolInfo = await fetchUserInstaPoolInfo(_acc);
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      let rows = []
      userPoolInfo.map((pool, index) => {
        if (pool.balance > 0) {
          let name = pool.name;
          let balance = pool.balance;
          let symbol = pool.symbol;
          rows.push(createData(name, symbol, balance));
        }
      })
      setPoolRows(rows);
    }

    if (identifier === 'maker') {
      let _acc = account.toLowerCase()
      let userPoolInfo = await fetchUserMakerPoolInfo(_acc); 
      console.log(userPoolInfo)
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      let rows = []
      let vaults = userPoolInfo[0].vaults;
      console.log(vaults)
      if (!vaults || vaults.length <= 0) return;
      vaults.map((pool, index) => {
        if (pool.collateral > 0) {
          let balance = pool.collateral;
          
          let symbol = pool.collateralType.id;
          rows.push(createData(symbol + "Pool",  symbol, balance));
        }
      })
      setPoolRows(rows);
    }

    if (identifier === 'Yearn') {
      let _acc = account.toLowerCase()
      let userPoolInfo = await fetchUserYearnPoolInfo(_acc); 
      console.log(userPoolInfo)
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      let rows = []
      userPoolInfo.map((pool, index) => {
        if (pool.balanceTokens > 0) {
          let token =pool.token;
          let decimals = token.decimals;
          let balance = pool.balanceTokens;
          let stakebalance = getBalanceNumber(balance, decimals);
          
          let name = token.name;
          let symbol = token.symbol
          rows.push(createData(name,  symbol, stakebalance.toFixed(3)));
        }
      })
      setPoolRows(rows);
    }
    if (identifier === 'Venus') {
      let rows = [];
      let userPoolInfo = await fetchUserVenusPoolInfo(account); //"'0x67525DDAFD3e3DF5BE9a0a951A4e7Ff91C1e4609'"
      if(userPoolInfo.length > 0){
        userPoolInfo.map((pooldata) =>{
          if(pooldata.balance >0) {
            let balance = pooldata.balance;
            let symbol = pooldata.symbol;
            let name = pooldata.name + "POOL";
            rows.push(createData(name, symbol, balance))
          }
        })
      }
      setPoolRows(rows);
    }
    if (identifier === 'Sushi') {
      let _acc = account.toLowerCase()
      let userPoolInfo = await fetchUserSushiPoolInfo(_acc); 
      console.log(userPoolInfo)
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      let userPooldata = userPoolInfo.liquidityPositions
      let rows = []
      userPooldata.map((pool, index) => {
        if (pool.liquidityTokenBalance > 0) {
          let balance = pool.liquidityTokenBalance;
          let stakebalance = Number(balance).toFixed(3)
          let pair =pool.pair.name;
          let symbol0 = pool.pair.token0.symbol;
          let symbol1 = pool.pair.token1.symbol
          rows.push(createData(pair, symbol0 +"-"+ symbol1 +' LP', stakebalance));
        }
      })
      setPoolRows(rows);
    }
    if (identifier === 'Curve') {
      let rows = [];
      let userPoolInfo = await fetchUserCurvePoolInfo(account); //"'0x67525DDAFD3e3DF5BE9a0a951A4e7Ff91C1e4609'"
      if(userPoolInfo.length > 0){
        userPoolInfo.map((pooldata) =>{
          if(pooldata.balance >0) {
            let balance = pooldata.balance;
            let symbol = pooldata.symbol;
            let name = pooldata.name;
            let _decimals = pooldata.decimals;
            let _price = pooldata.price;
            let stakebalance = getBalanceNumber(balance, _decimals);
            rows.push(createData(name, symbol, stakebalance, parseFloat(stakebalance) * parseFloat(_price)))
          }
        })
      }
      setPoolRows(rows);
    }
    if (identifier === 'Compound') {
      let userPoolInfo = await fetchUserCompoundPoolInfo("0x67525ddafd3e3df5be9a0a951a4e7ff91c1e4609");//'0x00000000000080c886232e9b7ebbfb942b5987aa'
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      let rows = []
      userPoolInfo.map((pool, index) => {
        if (pool.amount > 0) {
          let balance = pool.amount;
          let symbol = pool.symbol;
          let balanceUSD = parseFloat(balance) * parseFloat(pool.price);
          rows.push(createData(symbol + ' Pool', symbol, balance, balanceUSD));
        }
      })
      setPoolRows(rows);
    }
    if (identifier === 'Uniswap') {
      let _account = account;
      let _acc = _account.toLowerCase()
      let userPoolInfo = await fetchUserUniswapPoolInfo(_acc); //"0x000000000000000000000000000000000000dead"
      if (!userPoolInfo || userPoolInfo.length <= 0) return;
      
      let rows = []
      userPoolInfo.map((pool, index) => {
        if (pool.liquidity > 0) {
          let balance = pool.liquidity;
          let balanceUSD = pool.amountUSD;
          let pair = pool.pair.token0.symbol + '/' + pool.pair.token1.symbol;
          rows.push(createData(pair + ' Pool', pair + ' LP', balance, balanceUSD));
        }
      })
      setPoolRows(rows);
    }
    if (identifier === 'Pancakeswap') {
      let acc = account;
      let stakedResult = await fetchFarmUserStakedBalances(acc.toLowerCase()); //'0x34F758aBABF2393d890d47B822891024471F7790'
      if (!stakedResult || stakedResult.length <= 0) return;
      let rows = []
      stakedResult.map((pool, index) => {
        if (pool.liquidity > 0) {
          let balance = pool.liquidity;
          let balanceUSD = pool.amountUSD;
          let pair = pool.pair.token0.symbol + '/' + pool.pair.token1.symbol;
          rows.push(createData(pair + ' Pool', pair + ' LP', balance, balanceUSD));
        }
      })
      setFarmRows(rows);
      let stakedBalances = await fetchUserStakeBalances(acc.toLowerCase()); //'0x29cf025d0aC42B6c47933482CdbfD718dc475F8e'
      rows = []
      let pool_len = poolsConfig.length;
      for (let i = 0; i < pool_len; i ++) {
        if (stakedBalances[poolsConfig[i].sousId] > 0) {
          const stakedBalance = new BigNumber(stakedBalances[poolsConfig[i].sousId]);
          const stakingToken = poolsConfig[i].stakingToken;
          const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals);
          const tokenPrice = await fetchTokenPrice(stakingToken.address['56'].toLowerCase());
          let balanceUSD = 0;
          if (tokenPrice.length > 0) {
            balanceUSD = tokenPrice[0].derivedUSD * parseFloat(stakedTokenBalance.toString());
          }
          rows.push(createData(poolsConfig[i].earningToken.symbol + ' Pool', poolsConfig[i].stakingToken.symbol, stakedTokenBalance.toString(), balanceUSD));
        }
      }
      setPoolRows(rows);
    }
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={2}
        direction={isMd ? 'row' : 'column'}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          data-aos={'fade-up'}
        >
          <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.error.light }}>
                  SEARCH FORM 
                </span>
               </div>
            }
            
            align={isMd ? "left" : 'center'}
            disableGutter
            titleVariant="h3"
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={8}
          data-aos={'fade-up'}
        >
          <SearchAddress onSearch={handleSearch} onChangeSelect={handleChangeIdentifer}/>
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction={isMd ? 'row' : 'column'}
      >
       {curIdentifier === 'Pancakeswap' ? <Grid
          item
          xs={12}
          md={6}
          data-aos={'fade-up'}
          style={{ width: '100%', marginTop: 50}}
        >
          <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.warning.light }}>
                  Farm 
                </span>
               </div>
            }
            
            align={'center'}
            disableGutter
            titleVariant="h4"
          />
          <CustomizedTable rows={farmRows}/>          
        </Grid>:''}
        <Grid
          item
          xs={12}
          md={curIdentifier === 'Pancakeswap' ? 6 : 12}
          data-aos={'fade-up'}
          style={{ width: '100%', marginTop: 50}}
        >
          <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.warning.light }}>
                  Pool 
                </span>
               </div>
            }
            
            align={'center'}
            disableGutter
            titleVariant="h4"
          />
          <CustomizedTable rows={poolRows}/>          
        </Grid>
      </Grid>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
