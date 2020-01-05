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

router.post('/register', async function (req, res) {
    var category = await categorymodel.all();

    const hash = bcrypt.hashSync(req.body.register_password, config.authentication.saltRounds);
    const entity = {
      name: req.body.register_name,
      email: req.body.register_email,
      password: hash
    }
    const ret = await usermodel.add(entity);

     res.render('./login', {
        category: category
    });

  })

module.exports = router;