const express = require('express');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/admin', async function (req, res) {
    if (req.session.user.priviledge != "admin")
        return res.redirect("/404");

    res.render("./admin");
});

router.get('/profile', async function (req, res) {
    // if (req.session.user.priviledge != "bidder" || req.session.user.priviledge != "seller")
    //     return res.redirect("/404");

    res.render("./profile");
});

router.get('/active/:id', async function (req, res) {
    var user = await usermodel.id(req.params.id);
    user = user[0];
    if (!user || user.type != null)
        return res.redirect("/404");
    
    const entity = {
        type: "bidder"
    }
    const condition = {
        id: user.id
    }

    await usermodel.update(entity, condition);
    user = await usermodel.id(user.id);
    user = user[0];

    req.session.authenticated = true;
    req.session.user = user;

    res.render("./accept");
});

router.get('/reminder', async function (req, res) {
    res.render("./reminder");
});

module.exports = router;