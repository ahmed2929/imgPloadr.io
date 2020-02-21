var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;
var imagechema=new Schema({

    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, 'default': 0 },
    likes: { type: Number, 'default': 0 },
    timestamp: { type: Date, 'default': Date.now }


})

imagechema.virtual('uniqueId').get(function (){

   return this.filename.replace(path.extname(this.filename), '');
})
module.exports=mongoose.model('Image',imagechema)