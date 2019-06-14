var categoryModel = require('../models/category.model');
var LRU = require("lru-cache");
  var cache_options = {
       max: 500,
       maxAge: 1000 * 60
    }
  var cache = new LRU(cache_options);

module.exports = (req, res, next) => {

     var data = cache.get('globalCategories');
     if(!data)
     {
        // console.log('-- fetch `globalCategories`');
        categoryModel.allWithDetails().then(rows => {
            cache.set('globalCategories', rows);
        res.locals.lcCategories = rows;
        next();
    });
     }
     else{
        // console.log('-- cache hit for `globalCategories`');
        for(const c of data)
        {
            delete c.active
        }
        res.locals.lcCategories = data;
        next();
     }  
    // categoryModel.allWithDetails().then(rows => {
    //     res.locals.lcCategories = rows;
    //     next();
    // });
}