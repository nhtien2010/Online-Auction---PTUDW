
const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const usermodel = require('../models/usermodel');
const router = express.Router();

router.get('/', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./admin', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});

router.get('/category', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./category', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});

router.get('/product', async function (req, res) {
    await productmodel.refresh();
    var product = await productmodel.all();
    res.render('./product', {
        product
    });
});

router.get('/user', async function (req, res) {
    var bidder = await usermodel.getType("bidder");
    var seller = await usermodel.getType("seller");
    var request = await usermodel.getReqBidder();
    res.render('./user', {
        bidder,
        seller,
        request
    });
});


module.exports = router;