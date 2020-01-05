const express = require('express');
const productmodel = require('../models/productmodel');
const router = express.Router();

router.get('/', async function (req, res) {
    await productmodel.refresh();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./', {
        end: end,
        price: price,
        bid: bid,
    });
});

module.exports = router;