const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const router = express.Router();

router.get('/', async function (req, res) {
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});

module.exports = router;