const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const configuration = require('../config/default.json');
const router = express.Router();

router.post('/product/:id', async function (req, res) {
    await productmodel.refresh();
    const product = await productmodel.search(req.params.id);
    const offset = configuration.pagination.limit;
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
        product: product,
        pages: pages,
        offset: offset
    } )

})

module.exports = router;