const express = require('express');
const productmodel = require('../models/profilemodel');

router.get('/profile', async function (req, res) {
    res.render('./profile', {
        
    });
});

module.exports = router;