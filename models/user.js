var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

var userSchema= new Schema({

    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String}

})

module.exports=mongoose.model('user',userSchema);