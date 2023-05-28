const axios = require('axios');

const api = 'https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY_AVG?date=20230527&stockNo=0050&response=json&_=1685173925119'
axios.get(api)
  .then(response => {
    const data = response.data;
    console.log(data); // 處理回應的資料
  })
  .catch(error => {
    console.error('請求失敗', error);
  });