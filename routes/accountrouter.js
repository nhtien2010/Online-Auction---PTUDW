const express = require('express');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/admin', async function (req, res) {
    if (req.session.user.type != "admin")
        return res.status(404);

    res.render("./admin");
});

router.get('/bidder', async function (req, res) {
    if (req.session.user.type != "bidder")
        return res.status(404);

    res.render("./bidder-profile");
});

router.get('/seller', async function (req, res) {
    if (req.session.user.type != "seller")
        return res.status(404);

    res.render("./seller-profile");
});

module.exports = router;