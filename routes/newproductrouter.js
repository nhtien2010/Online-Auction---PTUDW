const express = require('express');
const moment = require('moment');
const userModel = require('../models/usermodel');
const config = require('../config/default.json');

const router = express.Router();

router.get('/user/new-product', async function (req, res) {
  res.render('./new-product');
});

router.post('/new-product', async function (req, res) {
  const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const user = await userModel.singleByUserName(req.query.user);
  const entity = {
    name: req.body.name,
    seller: user,
    start: req.body.start,
    end: req.body.end,
    holder: user,
    description: req.body.description,
    status:'bidding'
  }
  const ret = await userModel.add(entity);
  res.render('/profile/:id');
})

router.get('/is-available', async function (req, res) {

})

module.exports = router;