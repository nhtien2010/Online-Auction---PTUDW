const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const usermodel = require('../models/usermodel');
const router = express.Router();

router.get('/:id', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var product = await productmodel.detail(req.params.id);
    product = product[0];
    var related = await productmodel.related(product.category);
    var holder = await usermodel.id(product.holder);
    holder = holder[0];
    var seller = await usermodel.id(product.seller);
    seller = seller[0];
    var path;
    var prepath;
    path = await categorymodel.id(product.category);
    if(path) {
        path = path[0]
        prepath = await categorymodel.id(path.parent);
        prepath = prepath[0];
    }
    
    res.render('./detail', {
        product: product,
        holder: holder,
        seller: seller,
        category: category,
        related: related,
        path: path,
        prepath: prepath
    });
})

module.exports = router;