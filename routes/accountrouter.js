
const express = require('express');
const usermodel = require('../models/usermodel');
const productmodel = require('../models/productmodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/admin', async function (req, res) {
    if (req.session.user) {
        if (req.session.user.privilege != "admin")
            return res.redirect("/404");
    }
    else return res.redirect("/404");

    res.render('./admin');
});

router.get('/profile', async function (req, res) {
    if (req.session.user) {
        if (req.session.user.privilege != "bidder" && req.session.user.privilege != "seller")
            return res.redirect("/404");
    }
    else
        return res.redirect("/404");

    var watchlist = await productmodel.watchlist(req.session.user.id);
    var participate = await productmodel.participate(req.session.user.id);
    var wonlist = await productmodel.wonlist(req.session.user.id);

    if (req.session.user.privilege == "bidder")
        return res.render('./profile', {
            user: req.session.user,
            name: req.session.user.name,
            email: req.session.user.email,
            dob: req.session.user.dob,
            priviledge: req.session.user.priviledge,
            address: req.session.user.address,
            watchlist: watchlist,
            participate: participate,
            wonlist: wonlist
        });
    
    var ongoing = await productmodel.ongoing(req.session.user.id);
    var soldlist = await productmodel.soldlist(req.session.user.id);

    res.render('./profile', {
        user: req.session.user,
        name: req.session.user.name,
        email: req.session.user.email,
        dob: req.session.user.dob,
        priviledge: req.session.user.priviledge,
        address: req.session.user.address,
        watchlist: watchlist,
        participate: participate,
        wonlist: wonlist,
        ongoing: ongoing,
        soldlist: soldlist
    });

});

router.get('/active/:id', async function (req, res) {
    var user = await usermodel.id(req.params.id);
    user = user[0];
    if (!user || user.privilege != null)
        return res.redirect("/404");

    const entity = {
        privilege: "bidder"
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

router.post('/upgrade', async function (req, res) {
    const entity = {
        id: req.body.id,
        name: req.body.name,
        request: 'upgrade'
    }

    const rs = await usermodel.update(entity);

    res.redirect('#');
});

module.exports = router;