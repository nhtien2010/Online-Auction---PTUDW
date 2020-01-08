const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
const usermodel = require('../models/usermodel');
const router = express.Router();

router.get('/', async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    
    res.render('./admin', {
        end: end,
        price: price,
        bid: bid,
        category: category
    });
});

router.get('/user-view/:UserId',async function (req, res){
    await usermodel.refresh();
    const user = await usermodel.id(req.params.UserId);
    res.render('./user-view', {
        user: user[0],
    });
});

//add user
// router.get('/user-add',async function (req, res) {
//     res.render('./user-add');
// });


// upgrade bidder by id
router.post('/up-bidder/:UserId',async function (req, res) {
    const entity = {
        id: req.params.UserId,
        request: "none",
        type: "seller"
    }
    // console.log(req.params.UserId);
    const rs = await usermodel.changeType(entity);
    res.redirect('/admin/user');
});

// downgrade seller by id
router.post('/down-seller/:UserId',async function (req, res) {
    const entity = {
        id: req.params.UserId,
        request: "none",
        type: "bidder"
    }
    const rs = await usermodel.changeType(entity);
    res.redirect('/admin/user');
});

//delete user by id
router.post('/del-user/:UserId',async function (req, res) {
    const product = await productmodel.countByUser(req.params.UserId);
    if(product === 0){
        console.log("can delete this user");
        const rs = await usermodel.delete(req.params.UserId);
    }
    else{
        console.log("canot delete this user");
    }
    res.redirect('/admin/user');
});


module.exports = router;