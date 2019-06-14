var express = require("express");
var router = express.Router();
var categoryModel = require('../models/category.model');
var newsModel = require('../models/news.model');
var config = require('../config/default.json');

router.get('/', (req, res, next) => {
    categoryModel.all()
        .then(rows => {
            res.render('vwcategories/index', {
                categories: rows
            });
        })
        .catch(next);
})

router.get('/add', (req, res, next) => {
    res.render('vwcategories/add');
})

router.get('/edit/:id', (req, res,next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwcategories/edit', {
            error: true
        });
        return;
    }
    categoryModel.single(id)
        .then(rows => {
            if (rows.length > 0) {
                res.render('vwcategories/edit', {
                    error: false,
                    category: rows[0]
                });
            } else {
                res.render('vwcategories/edit', {
                    error: true
                });
            }
        }).catch(next);
})

router.post('/add', (req, res, next) => {

    categoryModel.add(req.body).then(id => {
        console.log(id);
        res.render('vwcategories/add');
    }).catch(next);

})

router.post('/update', (req, res, next) => {

    categoryModel.update(req.body).then(n => {
        res.redirect('/categories');
    }).catch(next);
})

router.post('/delete', (req, res, next) => {

    categoryModel.delete(+req.body.CatID).then(n => {
        res.redirect('/categories');
    }).catch(next);
})

router.get('/:id/news', (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwNews/byCat', {
            error: true
        });
        return;
    }

    

    var limit = config.paginate.default;
    var page = req.query.page||1;
    if(page<1)
    {
        page =1;
    }
    var start_offset =(page-1)*limit;

    Promise.all([
        // newsModel.allByCat(id),
        newsModel.countByCat(id),
        newsModel.allByCat(id),
        newsModel.pageByCat(id, start_offset),
       

    ]).then(([nRows, rows]) => {

        // console.log(nRows);

        for (var c of res.locals.lcCategories) {
            if (c.CatID === +id) {
                c.active = true;
            }

        }

        var total = nRows[0].total;
        var lim = config.paginate.default;
        var nPage = Math.floor(total/lim);
        if(total% lim >0)
        {
            nPage++;
        }

        var page_numbers = [];
        for ( i =1;i<=nPage;i++) {
            page_numbers.push({
                value:i,
                active: i === +page
            })
            
        }

        res.render('vwNews/byCat', {
            error: false,
            empty: rows.length === 0,
            news: rows,
            page_numbers
        });

    }).catch(next);
})



// router.get('/:id/news', (req, res,next) => {
//     var id = req.params.id;
//     if (isNaN(id)) {
//         res.render('vwNews/byCat',{ error: true});
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