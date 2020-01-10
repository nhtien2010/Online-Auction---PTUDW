
const express = require('express');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/admin', async function (req, res) {
    if (req.session.user.privilege != "admin")
        return res.redirect("/404");

    res.render('./admin');
});

router.get('/bidder', async function (req, res) {
    if (req.session.user.privilege != "bidder")
        return res.redirect("/404");

    res.render("./profile");
});

router.get('/seller', async function (req, res) {
    if (req.session.user.privilege != "seller")
        return res.redirect("/404");

    res.render("./profile");
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

router.post('/upgrade/:Id',async function (req, res) {
    const entity = {
        request: "upgrade"
    }
    const condition = {id: req.params.Id};
    const rs = usermodel.update(entity, condition); 
    res.redirect('/account/bidder');
});
module.exports = router;