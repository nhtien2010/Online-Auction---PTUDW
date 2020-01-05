const express = require('express');
const categorymodel = require('../models/categorymodel');
const router = express.Router();

router.get('/login', async function (req, res) {
    var category = await categorymodel.all();
    
    res.render('./login', {
        category: category
    });
});

router.post('/login', async function (req, res) {
})

module.exports = router;