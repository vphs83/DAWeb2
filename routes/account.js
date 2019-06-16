var express = require("express");
var bcrypt = require('bcrypt');
var router = express.Router();
var moment = require('moment');
var userModel = require('../models/user.model');

router.get('/register', (req, res, next) => {
    res.render('vwAccount/register');
})


router.post('/register', (req, res, next) => {
    var saltRounds =10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = req.body;
    entity.f_Password = hash;
    entity.f_DOB = dob;
    entity.f_Permission = 0;

    delete entity.password;
    delete entity.comfirm;
    delete entity.dob;
    userModel.add(entity).then(id=>{
        res.redirect('/account/login');
    })
})

router.get('/is-available', (req, res, next) => {
    var user = req.query.user;
    userModel.singleByUserName(user).then(rows =>{
        if(rows.length>0)
        {
            res.json(false);
        }
        else
        {
            res.json(true);
        }
    })
})

router.get('/login', (req, res, next) => {
    res.end('login');
})

module.exports = router;