var models = require('../models/index');
var attachImage = async function(comment) {
   
    try{

        var image=await models.Image.findOne({ _id : comment.image_id});
        comment.image=image;
        return comment;

    }
    catch (err){
        throw err;
    }
  

    
    };


module.exports = {
    newest: async function() {
    try{
        var  comments = await models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }})
         comments.forEach(async comment => {
              comment= await attachImage(comment);
              //console.log(comment)
        })  
        return comments
       
       
       
    }
    catch (err){
        throw err;
    }
   


    }
};