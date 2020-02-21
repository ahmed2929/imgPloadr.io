var express=require('express');
var app=express();
var config = require('./server/configure');
var mongoose = require('mongoose');
app=config(app);
mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open',()=>{
    console.log('connected to db .');
})
app.set('port',process.env.PORT||3000);
app.set('views',__dirname+'/views');


app.listen(app.get('port'),()=>{
console.log("server up ..");
})
