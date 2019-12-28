const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const config = require('../config/default.json');
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
})

router.get('/category/:id', async function (req, res) {
    const product = await productmodel.category(req.params.id);
    const category = await categorymodel.all();
    const offset = config.pagination.limit;
    var quantity = parseInt(product.length / offset);
    const pages = [];
    for(var i = 1; i <= quantity; i++) {
        const item = {
            value: i
        };
        pages.push(item);
    }

    if(parseFloat(product.length / 12) == 0)
        pages.pop();

    res.render('./search', {
        category: category,
        product: product,
        id: req.params.id,
        name: req.params.name,
        pages: pages,
        offset: offset
    } )

})

router.get('/:page', async function (req, res) {
    let page = req.params.page;
    var category = await categorymodel.all();
    res.render(page, {
        category: category
    })
});

module.exports = router;