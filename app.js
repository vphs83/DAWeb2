var express = require('express');
var exphbs= require('express-handlebars');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));

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
 var port  = 3000;
 app.listen(port,()=>
 {
     console.log(`server is running at port ${port} `);
 })