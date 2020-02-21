var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commnetSchema=new Schema({

    image_id: { type: ObjectId },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, 'default': Date.now }


})

commnetSchema.virtual('imag').set((img)=>{
this._image=img;
}).get(()=>{
    return this._image;
})

module.exports = mongoose.model('Comment', commnetSchema);