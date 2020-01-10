const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bids = await productmodel.bids();
    
    res.render('./admin', {
        end: end,
        price: price,
        bid: bids,
        category: category
    });
});

router.get('/category', async function (req, res) {
    var category = await categorymodel.all();
<<<<<<< HEAD
    
=======

>>>>>>> c7d6d9eedbbc528d9b1bde83ba7a5a3f4efb7efd
    res.render('./category', {
        category: category
    });
});

router.get('/product', async function (req, res) {
    await productmodel.refresh();
    const page = 1;

    const total = await productmodel.total();
    const rows = await productmodel.page(0);
    const nPages = Math.ceil(total / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        isActive: i === page
      }
      page_items.push(item);
    }
    res.render('./product', {
        products: rows,
        empty: rows.length === 0,
        page_items,
        can_go_prev: page > 1,
        can_go_next: page < nPages,
        prev_value: page - 1,
        next_value: page + 1,

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