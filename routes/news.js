var express = require("express");
var newsModel = require('../models/news.model');
var router = express.Router();

// router.get('/', (req, res, next) => {
//     categoryModel.all()
//         .then(rows => {
//             res.render('vwcategories/index', {
//                 categories: rows
//             });
//         })
//         .catch(next);
// })

// router.get('/add', (req, res, next) => {
//     res.render('vwcategories/add');
// })

router.get('/:id', (req, res,next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwNews/detail', {
            error: true
        });
        return;
    }
    newsModel.single(id)
        .then(rows => {
            if (rows.length > 0) {
                var news = rows[0];
                for(var c of res.locals.lcCategories){
                                if(c.CatID === news.CatID)
                                {
                                    c.active = true;
                               }   
                       }
                res.render('vwNews/detail', {
                    error: false,
                    news: news
                });
            } else {
                res.render('vwNews/detail', {
                    error: true
                });
            }
        }).catch(next);
})

// router.post('/add', (req, res, next) => {

//     categoryModel.add(req.body).then(id => {
//         console.log(id);
//         res.render('vwcategories/add');
//     }).catch(next);

// })

// router.post('/update', (req, res, next) => {

//     categoryModel.update(req.body).then(n => {
//         res.redirect('/categories');
//     }).catch(next);
// })

// router.post('/delete', (req, res, next) => {

//     categoryModel.delete(+req.body.CatID).then(n => {
//         res.redirect('/categories');
//     }).catch(next);
// })

// router.get('/:id/news', (req, res,next) => {
//     var id = req.params.id;
//     if (isNaN(id)) {
//         res.render('vwNews/edit',{ error: true});
//         return;
//     }
//     newsModel.allByCat(id).then(rows =>{
//         for(var c of res.locals.lcCategories){
//             if(c.CatID === +id)
//             {
//                 c.active = true;
//             }
           
//         }
//         res.render('vwNews/byCat',{
//             error: false,
//             empty: rows.length===0,
//             news:rows
//         });
//     }).catch(next);
// })

module.exports = router;