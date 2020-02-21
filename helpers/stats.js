var models = require('../models/index')
module.exports = async function() {

    try{
       var countImage=await models.Image.count({});
       var countcomments=await models.Comment.count({});
       var totalImage=await models.Image.find({});
       var likes=0,views=0;
       totalImage.forEach(async image => {
        likes+=image.likes;
        views+=image.views;

            })
      

        
    var stats = {
        images: countImage,
        comments: countcomments,
        views: views,
        likes: likes
        };
        return stats;
       
    }
    catch(err){
        throw err;
    }

    };