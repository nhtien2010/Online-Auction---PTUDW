const express = require('express');
const categorymodel = require('../models/categorymodel');
const router = express.Router();

router.get('/', async function(req, res){
    const result = await categorymodel.all();
    res.render('/public/admin' {
        categories: result,
        empty: result.length == 0
    });
})

router.get('/add', function(req, res){
    res.render('category-add');
})

module.exports = router;