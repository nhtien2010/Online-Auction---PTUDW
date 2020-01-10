
const express = require('express');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/admin', async function (req, res) {
    if (req.session.user.privilege != "admin")
        return res.redirect("/404");

    res.render('./admin');
});

router.get('/profile', async function (req, res) {
    if (req.session.user.privilege != "bidder" && req.session.user.privilege != "seller")
        return res.redirect("/404");
    res.render('./profile', {
        user: req.session.user,
        name: req.session.user.name,
        email: req.session.user.email,
        dob: req.session.user.dob,
        privilege: req.session.user.privilege,
        address: req.session.user.address,
    })
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

router.post('/profile/:name/edit-name', async function (req, res, next) {
    usermodel.singleByUsername(req.body.newusername)
        .then(user => {
            if (user) {
                alert("Username exist!");
                return res.redirect('/user/profile/' + req.session.user.name);
            } else {
                usermodel
                .update({
                    name: req.body.newusername
                }, {
                    where: { name: req.session.user.name }
                })
                .then(function() {
                    usermodel
                    .singleByUsername(req.body.newusername)
                    .then(user => {
                        req.session.user = user;
                        res.locals.user = req.session.user;
                        res.redirect('/');
                    })
                    .catch(error => next(error));
                })
                .catch(function(error) {
                    res.json(error);
                    console.log("update profile failed!");
                });
            }
        });
    res.render('./profile', {
        user: req.session.user,
        name: req.session.user.name,
        email: req.session.user.email,
        dob: req.session.user.dob,
        privilege: req.session.user.privilege,
        address: req.session.user.address,
    });
});

router.post('/profile/:name/edit-email', async function (req, res, next) {
    usermodel.singleByEmail(req.body.newemail)
        .then(user => {
            if (user) {
                alert("Email exist!");
                return res.redirect('/user/profile/' + req.session.user.name);
            } else {
                usermodel
                .update({
                    email: req.body.newemail
                }, {
                    where: { name: req.session.user.email }
                })
                .then(function() {
                    usermodel
                    .singleByEmail(req.body.newemail)
                    .then(user => {
                        req.session.user = user;
                        res.locals.user = req.session.user;
                        res.redirect('/');
                    })
                    .catch(error => next(error));
                })
                .catch(function(error) {
                    res.json(error);
                    console.log("update profile failed!");
                });
            }
        });
    res.render('./profile', {
        user: req.session.user,
        name: req.session.user.name,
        email: req.session.user.email,
        dob: req.session.user.dob,
        privilege: req.session.user.privilege,
        address: req.session.user.address,
    })  
});

router.post('/profile/:name/edit-dob', async function (req, res, next) {
    usermodel.singleByUsername(req.params.name)
        .then(function() {
                usermodel
                .update({
                    dob: req.body.newdob
                }, {
                    where: { name: req.session.user.mame }
                })
                .then(function() {
                    usermodel
                    .singleByUsername(req.params.name)
                    .then(user => {
                        req.session.user = user;
                        res.locals.user = req.session.user;
                        res.redirect('/');
                    })
                    .catch(error => next(error));
                })
                .catch(function(error) {
                    res.json(error);
                    console.log("update profile failed!");
                });
        });
    res.render('./profile', {
        user: req.session.user,
        name: req.session.user.name,
        email: req.session.user.email,
        dob: req.session.user.dob,
        privilege: req.session.user.privilege,
        address: req.session.user.address,
    });
});
module.exports = router;