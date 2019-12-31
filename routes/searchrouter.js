const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/category/:id', async function (req, res) {
    await productmodel.refresh();
    const product = await productmodel.category(req.params.id);
    const category = await categorymodel.all();
    const offset = config.pagination.limit;
    var quantity = parseInt(product.length / offset);
    const pages = [];
    var path = await categorymodel.id(req.params.id);
    path = path[0];
    var prepath = await categorymodel.id(path.parent);
    prepath = prepath[0];
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
        pages: pages,
        offset: offset,
        path: path,
        prepath: prepath
    } )

})

router.get('/product/:id', async function (req, res) {
    await productmodel.refresh();
    const product = await productmodel.search(req.params.id);
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
        pages: pages,
        offset: offset
    } )

})

module.exports = router;