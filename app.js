var express = require('express')
var app = express();

app.get('/',(req,res)=>{
    res.render('Hello');
})

var port = 3000;
app.listen(port,()=>
{
    
    console.log(`server is running is port ${port}`);
})