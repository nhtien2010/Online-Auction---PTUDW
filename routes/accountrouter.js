const express = require('express');
const categorymodel = require('../models/categorymodel');
const bcrypt = require('bcryptjs');
const usermodel = require('../models/usermodel');
const config = require('../config/default.json');
const router = express.Router();

router.get('/login', async function (req, res) {
    var category = await categorymodel.all();
    
    res.render('./login', {
        category: category
    });
});

router.post('/login', async function (req, res) {
});

router.get('/register', async function (req, res) {
    var category = await categorymodel.all();
    
    res.render('./register', {
        category: category
    });
});

router.post('/register', async function (req, res) {
    var category = await categorymodel.all();
    var checking = await usermodel.check(req.body.register_email);
    if(checking.length == 0) {
        const hash = bcrypt.hashSync(req.body.register_password, config.authentication.saltRounds);
        const entity = {
          name: req.body.register_name,
          email: req.body.register_email,
          password: hash
        }
    
        await usermodel.add(entity);
    
         res.render('./login', {
            category: category
        });
    }else {
        res.render("./register", {
            category: category,
            name: req.body.register_name,
            email: req.body.register_email,
            password: req.body.register_password,
            repeat: req.body.register_repeat,
            error: "This email address is already being used!"
        });
    }
  })

module.exports = router;