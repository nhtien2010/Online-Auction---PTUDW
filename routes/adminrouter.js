const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
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
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./product', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});

router.get('/user', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./user', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});


module.exports = router;