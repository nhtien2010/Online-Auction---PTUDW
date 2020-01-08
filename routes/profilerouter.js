const express = require('express');
const productmodel = require('../models/profilemodel');
const usermodel = require('../models/usermodel');

router.get('/profile', async function (req, res) {
    res.render('./profile', {
        
    });
});

router.post('/user/:id/edit-profile', (req, res, next) => {
    let username = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    userController
        .getUserByEmail(user.email)
        .then(user => {
            if (user) {
                return res.render('register', {
                    message: `Email ${email} exists!`,
                    type: 'alert-danger'
                });
            }
            //Tao tai khoan
            user = {
                username,
                email,
                password
            };
            return userController
                .createUser(user)
                .then(user => {
                    if (keepLoggedIn) {
                        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 100;
                        req.session.user = user;
                        res.redirect('/');
                    } else {
                        res.render('login', {
                            message: 'You have registered, now please log in!',
                            type: 'alert-primary'
                        });
                    }
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
});

router.post('/upgrade', async function (req, res) {
    const entity = {
        id: req.body.id,
        name: req.body.name,
        request: 'upgrade'
    }

    const rs = await usermodel.update(entity);

    res.redirect('/');
});
module.exports = router;