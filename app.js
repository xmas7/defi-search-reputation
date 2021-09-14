// const CoinMarketCapAPI = require('coinmarketcap-api')
// const getTokenPrice = async () => {
//     let cmcApi = new CoinMarketCapAPI('9a87f55d-e67f-445b-8497-fa87f8a76cdd');
//     // let tool=cmcApi.tools_priceconversion(20, 'BTC','USD');
//     let quotes = await cmcApi.getQuotes({symbol: "ETH-WBNB", convert: 'USD'});
//     console.log(quotes);
//     console.log(JSON.stringify(quotes));
// }

// getTokenPrice();
// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://coingecko.p.rapidapi.com/exchanges/list',
//   headers: {
//     'x-rapidapi-key': 'dc6c92b64dmsh3c807b7ad1caf99p143843jsn475e2c24df60',
//     'x-rapidapi-host': 'coingecko.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.log("ERRRO");
// });
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();
    
// CoinGeckoClient.coins.list()
// .then(({ data }) => {
//     data.map((item) => {
//         if (item.symbol == 'bnb') {
//             console.log(item);
//         }
//     })
//     // var _coinList = {};
//     // var _datacc = data.data.tickers.filter(t => t.target == 'USD');
//     // [
//     //     'BTC'
//     // ].forEach((i) => {
//     //     var _temp = _datacc.filter(t => t.base == i);
//     //     var _res = _temp.length == 0 ? [] : _temp[0];
//     //     _coinList[i] = _res.last;
//     // })
// })

var zrx = '0xe41d2489571d322189246dafa5ebde1f4699f498';
CoinGeckoClient.simple.fetchTokenPrice({
  contract_addresses: zrx,
  vs_currencies: 'usd',
})
.then(({ data }) => {
    console.log(data);
});
CoinGeckoClient.exchanges.list()
  .then(({ data }) => {
      data.map((item) => {
          if (item.id == 'mdex_bsc') {
              console.log(item);
          }
      })
  });
CoinGeckoClient.exchanges.fetchTickers('mdex_bsc', {page: 1})
  .then(({ data }) => {
     console.log(data.tickers.length);
     data.tickers.map((item) => {
        console.log(item);
     })
  });