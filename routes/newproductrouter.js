const express = require('express');
const categorymodel = require('../models/categorymodel');
const userModel = require('../models/usermodel');
const multer  = require('multer');
//var upload = multer({ dest: 'uploads/' })

const router = express()
 
const router = express.Router();

router.get('/user/new-product', async function (req, res) {
  var category = await categorymodel.all();
  res.render('./new-product');
});

let html = $('div#description').froalaEditor('html.get') ;
let div = document.createElement("div");
div.innerHTML = html;

router.post('/user/:id/new-product', async function (req, res) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
   
  const upload = multer({ storage });
  upload.array('fileInput', 12)(req, res, function(err){
    if(err){
      
    }
  });
  const entity = {
    name: req.body.name,
    seller: req.session.user.id,
    start: req.body.start,
    end: req.body.end,
    holder: req.session.user.id,
    reserve: req.body.reserved,
    description: div.innerText,
    status:'bidding'
  }
  const ret = await userModel.add(entity);
  res.render('/profile/:id');
})

router.get('/is-available', async function (req, res) {

})

module.exports = router;