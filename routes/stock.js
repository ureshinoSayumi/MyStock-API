var express = require('express');
var router = express.Router();
const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const Post = require('../models/postsModel')
const axios = require('axios');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    console.log('stock')
    const dateRange = ['20220127', '20220227', '20220327', '20220427', '20220527', '20220627', '20220727', ]
    let api = 'https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY_AVG?date=20230527&stockNo=0050&response=json&_=1685173925119'
    try {
        let req = []
        for (let i = 0; i < dateRange.length; i++) {
            api = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY_AVG?date=${dateRange[i]}&stockNo=0050&response=json&_=`
            const response = await axios.get(api)
            const data = response.data;
            req.push(data.data)
        }
        console.log(req)
        sucessHandle(res, req, '全部取得成功')
    } catch (error) {
        console.log(error)
    } 
    // axios.get(api)
    // .then(response => {
    //     const data = response.data;
    //     console.log(res); // 處理回應的資料
    //     sucessHandle(res, data, '全部取得成功')
    // })
    // .catch(error => {
    //     console.error('請求失敗', error);
    // });
    // // const newPost = await Post.find()
});
router.get('/:id', async function(req, res, next) {
    try {
        const newPost = await Post.find({ _id: req.params.id })
        if (newPost.length == 0) {
            errorHandle(res, '單筆取得失敗，無此資料')
            return
        }
        sucessHandle(res, newPost, '單筆取得成功')
    } catch (error) {
        errorHandle(res, '單筆取得失敗(catch攔截)')
    }
  
});
router.post('/', async function(req, res, next) {
    try {
        const newPost = await Post.create(req.body)
        sucessHandle(res, newPost, '建立成功')
    } catch(error) {
        errorHandle(res, '建立失敗(catch攔截)')
    }
    
});
router.delete('/', async function(req, res, next) {
    const newPost = await Post.deleteMany({})
    sucessHandle(res, newPost, '全部刪除成功')
});
router.delete('/:id', async function(req, res, next) {
    try {
        const newPost = await Post.findByIdAndDelete(req.params.id)
        if (newPost == null) {
            errorHandle(res, '單筆刪除失敗，無此資料')
            return
        }
        sucessHandle(res, newPost, '單筆刪除成功')
    } catch(error) {
        errorHandle(res, '單筆刪除失敗，格式錯誤(catch攔截)')
    }
    
});
router.patch('/:id', async function(req, res, next) {
    try {
        const body = req.body
        const newPost = await Post.findByIdAndUpdate(
            req.params.id, body
        )
        if (newPost == null) {
            errorHandle(res, '單筆編輯失敗，無此資料')
            return
        }
        sucessHandle(res, newPost, '單筆編輯成功')
    } catch(error) {
        errorHandle(res, '單筆編輯失敗，格式錯誤(catch攔截)')
    }
    
});
module.exports = router;
