const express = require('express');
const bcrypt = require('bcryptjs');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/login', async function (req, res) {
    res.render('./login');
});

router.post('/login', async function (req, res) {
    var user = await usermodel.check(req.body.email);
    user = user[0];
    if (user == undefined)
        return res.render('./login', {
            announce: 'Invalid username or password.'
        });

    const rs = bcrypt.compareSync(req.body.password, user.password);
    if (rs === false)
        return res.render('./login', {
            announce: 'Invalid username or password.'
        });

    delete user.password;
    req.session.authenticated = true;
    req.session.user = user;

    const url = req.query.retUrl || '/';
    res.redirect(url);
});

router.get('/logout', async function (req, res) {
    req.session.authenticated = false;
    req.session.user = null;
    res.redirect(req.headers.referer);
});

router.get('/register', async function (req, res) {
    res.render('./register');
});

router.post('/register', async function (req, res) {
    var checking = await usermodel.check(req.body.register_email);
    if (checking.length == 0) {
        const hash = bcrypt.hashSync(req.body.register_password, config.authentication.saltRounds);
        const entity = {
            name: req.body.register_name,
            email: req.body.register_email,
            password: hash
        }

        await usermodel.add(entity);

        res.render('./login', {
            announce: "Signup complete! We've sent you a mail to confirm, please follow the link inside to active your account."
        });
    } else {
        res.render("./register", {
            name: req.body.register_name,
            email: req.body.register_email,
            password: req.body.register_password,
            repeat: req.body.register_repeat,
            error: "This email address is already being used!"
        });
    }
})

module.exports = router;