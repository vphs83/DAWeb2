var express = require("express");

var router = express.Router();



router.get('/register', (req, res, next) => {
    res.render('vwAccount/register');
})


router.post('/add', (req, res, next) => {

    
})



module.exports = router;