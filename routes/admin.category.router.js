const express = require('express');
const productmodel = require('../models/productmodel');
const categorymodel = require('../models/categorymodel');
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

router.get('/category-add',async function (req, res) {
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();

    res.render('./category-add', {
        end: end,
        price: price,
        bid: bid,
        category: category
    }
    );
});

//submit new category to database
router.post('/category-add',async function (req, res) {
    //if high level category
    if(req.body.txtcategoryParent != '-1'){
        const entity = {
            name : req.body.txtCatName,
            parent : req.body.txtcategoryParent,
        }
        console.log(entity);
        const rs = await categorymodel.insert(entity);
    }
    //if low level category
    else{
        const entity = {
            name : req.body.txtCatName
        }
        console.log(entity);
        const rs = await categorymodel.insert(entity);
    }
    
    //this equals router.get('/category-add',
    await productmodel.refresh();
    var category = await categorymodel.all();
    var end = await productmodel.end();
    var price = await productmodel.price();
    var bid = await productmodel.bid();
    res.render('./category-add', {
        end: end,
        price: price,
        bid: bid,
        category: category
    }
    );
});

// get category info by id
router.get('/category-view/:CatId',async function (req, res) {
    //queried entity
    const category = await categorymodel.getById(req.params.CatId);
    if(category === null) 
        throw new Error('Invalid parameter');
    if(category.parent === null)
        category.parent = 'NULL';
    
    //quantity of product which has selected category
    const quantity = await productmodel.countByCat(req.params.CatId);

    res.render('./category-view', {
        category,
        quantity
    }
    );
});

// get info and edit category by id
router.get('/category-edit/:CatId',async function (req, res) {
    //queried entity
    const category = await categorymodel.getById(req.params.CatId);
    if(category === null) 
        throw new Error('Invalid parameter');
    if(category.parent === null)
        category.parent = 'NULL';   
    //quantity of product which has selected category
    const quantity = await productmodel.countByCat(req.params.CatId);

    //get parent of selected category
    var parent = await categorymodel.getById(category.parent);
    if (parent === null) {
        parent = {
            id: null,
            name: "NULL",
        }
    }
    //
    // await productmodel.refresh();
    const categories = await categorymodel.all();
    res.render('./category-edit', {
        categories,
        category,
        quantity,
        parent
    }
    );
});

//post
router.post('/category-edit/:catid', async function(req, res){
    const entity = {
        id: req.body.txtCatId,
        name: req.body.txtCatName,
        parent: req.body.txtCatPar
    }
    if(entity.parent === '' || entity.parent===entity.id){
        entity.parent = null;
    }
    console.log(entity.id);
    console.log(entity.parent);
    const rs = await categorymodel.update(entity);

    res.redirect('/admin/category');
})


// delete category by id
router.post('/del/:CatId',async function (req, res) {
    const quantity = await productmodel.countByCat(req.params.CatId);   
    var message = "Can not delete category contains product";
    if(quantity === 0){
        const rs = await categorymodel.delete(req.params.CatId);
        message = "Category deleted";
    }
   
    res.redirect('/admin/category');
});

module.exports = router;