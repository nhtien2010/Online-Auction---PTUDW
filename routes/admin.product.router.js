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


// delete product by id
router.post('/del/:ProdId',async function (req, res) {
    const rs = await productmodel.delete(req.params.ProdId);
    res.redirect('/admin/product');
});

module.exports = router;