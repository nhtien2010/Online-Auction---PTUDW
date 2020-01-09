const express = require('express');
const productmodel = require('../models/profilemodel');
const usermodel = require('../models/usermodel');



router.post('/profile/:name/edit-name', (req, res, next) => {
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
        })
});

router.post('/profile/:name/edit-email', (req, res, next) => {
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
        })
});

router.post('/profile/:name/edit-dob', (req, res, next) => {
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
        })
});
module.exports = router;