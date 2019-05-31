var express = require("express");
var router = express.Router();
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
router.get('/single',(req, res)=>
{
    res.end('category');
})
module.exports = router;