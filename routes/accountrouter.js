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

router.get('/active/:id', async function (req, res) {
    var user = await usermodel.id(req.params.id);
    user = user[0];
    if (!user || user.type != null)
        return res.status(404);
    
    req.session.authenticated = true;
    req.session.user = user;

    res.render("./accept");
});

module.exports = router;