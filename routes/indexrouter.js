
const express = require('express');
const productmodel = require('../models/productmodel');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const configuration = require('../config/default.json');
const crypt = require('../utils/crypt');
const mailgun = require('mailgun-js')({ apiKey: crypt.decrypt(configuration.mailgun.api_key), domain: crypt.decrypt(configuration.mailgun.domain) });
const router = express.Router();

router.get('/', async function (req, res) {
    await productmodel.refresh();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bids = await productmodel.bids();

    req.session.save(function () {
        return res.render('./', {
            end: end,
            price: price,
            bids: bids,
        });
    });
});

router.get('/login', async function (req, res) {
    if (req.headers.referer.indexOf("/login") == -1 && req.headers.referer.indexOf("/registers") == -1 && req.headers.referer.indexOf('/otp') == -1)
        req.session.previous = req.headers.referer;

    var announce = req.session.announce;
    delete req.session.announce;

    req.session.save(function () {
        return res.render('./login', {
            announce: announce
        });
    });
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
    req.session.authenticated = false;
    req.session.user = user;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const entity = {
        otp: otp,
        email: user.email
    }

    await usermodel.otp(entity)

    const data = {
        from: 'Web Nerdy Team <Zerd@WNT.com>',
        to: req.session.user.email,
        subject: 'Online Auction',
        text: `Here is your one-time-passcode\n${otp}\nTo complete your process, enter the code in the web page when you requested it.\nNOTE: This one-time-passcode expires 15 minutes after it was requested.`
    };

    mailgun.messages().send(data);

    req.session.save(function () {
        return res.redirect('/otp');
    });
});

router.get('/logout', async function (req, res) {
    req.session.authenticated = false;
    req.session.user = null;
    if (req.headers.referer)
        if (req.headers.referer.indexOf("account") != -1)
            return req.session.save(function () {
                return res.redirect('/');
            });

    req.session.save(function () {
        return res.redirect(req.headers.referer);
    });
});

router.post('/validateemail', async function (req, res) {
    var user = await usermodel.check(req.body.resetEmail);
    user = user[0];
    if (user == undefined)
        return res.render('./login', {
            announce: "Email isn't registered."
        });

    req.session.previous = '/reset';
    delete user.password;
    req.session.authenticated = false;
    req.session.user = user;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const entity = {
        otp: otp,
        email: user.email
    }

    await usermodel.otp(entity)

    const data = {
        from: 'Web Nerdy Team <Zerd@WNT.com>',
        to: req.session.user.email,
        subject: 'Online Auction',
        text: `Here is your one-time-passcode\n${otp}\nTo complete your process, enter the code in the web page when you requested it.\nNOTE: This one-time-passcode expires 15 minutes after it was requested.`
    };

    mailgun.messages().send(data);

    req.session.save(function () {
        return res.redirect('/otp');
    });
})

router.get('/reset', async function (req, res) {
    req.session.previous = '/';
    res.render('./reset');
})

router.post('/reset', async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, configuration.authentication.saltRounds);
    const entity = {
        password: hash
    }
    const condition = {
        id: req.session.user.id
    }

    await usermodel.update(entity, condition);
    const data = {
        from: 'Web Nerdy Team <Zerd@WNT.com>',
        to: req.session.user.email,
        subject: 'Online Auction',
        text: `Hi,\nYour password has been changed successfully!\nThank you for joining WNT Online Auction\nSent: ${moment()}`
    };

    mailgun.messages().send(data);
    req.session.announce = "Your password has been changed successfully!"


    req.session.save(function () {
        return res.redirect('/login');
    });
})

router.get('/register', async function (req, res) {
    res.render('./register');
});

router.post('/register', async function (req, res) {
    var checking = await usermodel.check(req.body.register_email);
    if (checking.length == 0) {
        const hash = bcrypt.hashSync(req.body.register_password, configuration.authentication.saltRounds);
        const entity = {
            name: req.body.register_name,
            email: req.body.register_email,
            password: hash
        }

        await usermodel.add(entity);
        var user = await usermodel.check(entity.email);
        user = user[0];
        const data = {
            from: 'Web Nerdy Team <Zerd@WNT.com>',
            to: user.email,
            subject: 'Online Auction',
            text: `Hi,\nThanks for joining WNT Online Auction! Please confirm your email address by clicking on the link below. We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file.\nhttp://localhost:5000/account/active/${user.id}\nIf you did not sign up for a WNT account please disregard this email.\nHappy emailing!\nAdministrators`
        };

        mailgun.messages().send(data);

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

router.get('/404', async function (req, res) {
    res.render('./404');
});

router.get('/otp', async function (req, res) {
    if (req.headers.referer.indexOf("/login") == -1 && req.headers.referer.indexOf("/registers") == -1 && req.headers.referer.indexOf('/otp') == -1)
        req.session.previous = req.headers.referer;

    res.render('./otp');
});

router.post('/otp', async function (req, res) {
    var otp = req.body.otp;

    var target = await usermodel.verify(req.session.user.email)
    if (target.length == 0) {
        return res.render('./otp', {
            announce: 'Something went wrong, please re-login!'
        })
    }

    target = target[0];
    if (moment().isBefore(target.end)) {
        if (otp === target.otp) {
            if (req.session.previous.localeCompare("/reset") != 0)
                req.session.authenticated = true;

            const url = req.session.previous;
            delete req.session.previous;

            if (req.session.user.privilege == null)
                return req.session.save(function () {
                    return res.redirect('/account/reminder');
                });

            else if (req.session.user.privilege == "admin")
                return req.session.save(function () {
                    return res.redirect('/account/admin');
                });

            else if (url)
                return req.session.save(function () {
                    return res.redirect(url);
                });
            else
                return req.session.save(function () {
                    return res.redirect('./');
                });
        }
        else {
            return res.render('./otp', {
                announce: 'Invalid OTP!'
            })
        }
    }

    otp = Math.floor(100000 + Math.random() * 900000);
    const entity = {
        otp: otp,
        email: req.session.user.email
    }

    await usermodel.otp(entity)

    const data = {
        from: 'Web Nerdy Team <Zerd@WNT.com>',
        to: req.session.user.email,
        subject: 'Online Auction',
        text: `Here is your one-time-passcode\n${otp}\nTo complete your process, enter the code in the web page when you requested it.\nNOTE: This one-time-passcode expires 15 minutes after it was requested.`
    };

    mailgun.messages().send(data);

    res.render('./otp', {
        announce: 'OTP expires. We have sent new one to your email!'
    });
});


module.exports = router;