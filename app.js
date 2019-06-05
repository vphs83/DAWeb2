var express = require('express');
var exphbs= require('express-handlebars');
var morgan = require('morgan');
var app = express();
var createError = require('http-errors');
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }))
 

app.use(express.json())

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use('/categories', require('./routes/categories'));

app.get('/',(req, res)=>
{
    res.render('home');
})
app.get('/error',(req, res)=>
{
    res.render('error', {
        layout: false
    });
})

app.use((req, res, next)=>{
    next(createError(404));
})

app.use((err, req, res, next)=>{
    // console.log(process.env);
    var status = err.status||500;
    var vwErr = 'error';
    if(status === 404)
    {
        vwErr = '404';
    }
    // app.set('env','prod');
    var isProd = false;
    if(process.env.NODE_ENV && process.env.NODE_ENV ==='production')
    {
        var isProd = true;
    }
    var message = isProd? 'An error has occured. Please contact administartor for more support': err.message;
    var error = isProd ? {}: err;
    res.status(status).render(vwErr,{
        layout: false, 
        message,
        error
    });

})
 var port  = 3000;
 app.listen(port,()=>
 {
     console.log(`server is running at port ${port} `);
 })