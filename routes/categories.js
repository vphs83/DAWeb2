var express = require("express");
var router = express.Router();
// var categoryModel = require('../models/category.model');
var categoryModel = require('../models/category.model');
router.get('/',(req, res)=>
{
    categoryModel.all()
        .then(rows=>{
            res.render('categories/index',{
                categories: rows
            });
        })
        .catch(error=>{
           res.render('error',{layout:false});
        });
})

// router.get('/add',(req, res)=>
// {
//     res.end('category');
// })

router.get('/add',(req, res)=>
{
    res.render('categories/add');
})


router.post('/add',(req, res)=>
{
    
    categoryModel.add(req.body).then(id=>{
        console.log(id);
        res.render('categories/add');
    })
    
})
module.exports = router;