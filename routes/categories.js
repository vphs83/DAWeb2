var express = require("express");
var router = express.Router();
// var categoryModel = require('../models/category.model');
var categoryModel = require('../models/category.model');
router.get('/',(req, res,next)=>
{
    categoryModel.all()
        .then(rows=>{
            res.render('vwcategories/index',{
                categories: rows
            });
        })
        .catch(next);
})

// router.get('/add',(req, res)=>
// {
//     res.end('category');
// })

router.get('/add',(req, res,next)=>
{
    res.render('vwcategories/add');
})

router.get('/edit/:id',(req, res)=>
{
   var id = req.params.id;
   if(isNaN(id))
   {
    res.render('vwcategories/edit',{
        error:true
    });
    return;
   }
    categoryModel.single(id)
   .then(rows => {
       if(rows.length >0)
       {
           res.render('vwcategories/edit', {
               error: false,
               category: rows[0]
           });
       }
       else{
            res.render('vwcategories/edit',{
                error:true
            });
       }
   }).catch(next);
})

router.post('/add',(req, res,next)=>
{
    
    categoryModel.add(req.body).then(id=>{
        console.log(id);
        res.render('vwcategories/add');
    }).catch(next);
    
})

router.post('/update',(req, res,next)=>
{
    
    categoryModel.update(req.body).then(n=>{
        res.redirect('/categories');
    }).catch(next);
})

router.post('/delete',(req, res,next)=>
{
    
    categoryModel.delete(+req.body.CatID).then(n=>{
        res.redirect('/categories');
    }).catch(next);
})
module.exports = router;