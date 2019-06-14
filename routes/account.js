var express = require("express");

var router = express.Router();



router.get('/add', (req, res, next) => {
    res.render('vwAccount/Register');
})


router.post('/add', (req, res, next) => {

    
})



module.exports = router;