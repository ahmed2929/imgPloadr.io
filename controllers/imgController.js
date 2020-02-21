var fs = require('fs');
var path = require('path');
var sidebar=require('../helpers/sidebar');
var Models = require('../models/index');
var md5=require('MD5');
module.exports={
    index:(req,res)=>{
           // console.log(req.params.imgId)
        var viewModel = {
            image: {},
            comments: []
                                    
            };

            Models.Image.findOne({filename: { $regex: req.params.imgId}},(err,image)=>{
                //console.log('find one fired')
               if(err) throw err;

                if(image){
                    image.views = image.views + 1;
                    viewModel.image=image;
                        image.save();
                     Models.Comment.find({ image_id:image._id}, {}, { sort: {'timestamp': 1 }},(err,comments)=>{
                         if(err) throw err;
                        // console.log(comments)
                         viewModel.comments=comments;

                         

                       sidebar(viewModel,function(viewModel){

                         // console.log(viewModel)
                            res.render('image', viewModel);
                             });

                     })


                }else{
                    redirect('/');
                }
              




            })


    
    },
    create:(req,res,err)=>{
       console.log("create entered")
         function saveImg(){
            console.log("save image fired")
              var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
              var imgUrl = '';

              for(var i=0; i < 6; i+=1) {
                  imgUrl += possible.charAt(Math.floor(Math.random() *possible.length));
              }

              Models.Image.find({filename: imgUrl},(err,images)=>{
                if(err) throw err;
                if(images.length>0){
                    saveImg();
                }else{
                    console.log("unique name and it staring saving")

                    var tempPath = req.file.path;
                    var ext = path.extname(req.file.originalname).toLowerCase();
                  
       
                     var targetPath = path.resolve('./public/upload/' + imgUrl + ext);
       
                     if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') {
                      
                       fs.rename(tempPath, targetPath, function(err) {
                             
                           var newImg = new Models.Image({
                               title: req.body.title,
                               description: req.body.description,
                               filename: imgUrl + ext
                               });
                               newImg.save(function(err, image) {
                               console.log('Successfully inserted image: ' + image.filename);
                              res.redirect('/img/' + image.uniqueId);
                              image.uniqueId;
                               });
           
       
       
                        });
                         }else{
                                  
                            fs.unlink(tempPath, function () {
                               
                                 res.json(500, {error: 'Only image files are allowed.'});
                                });
       
       
       
                         }


                }








              })
        
            
           

                  
    
            


          }


          saveImg();
 
    },
    like:(req,res)=>{

        Models.Image.findOne({ filename: { $regex: req.params.imgId }},function(err, image) {
        if (!err && image) {
        image.likes = image.likes + 1;
        image.save(function(err) {
        if (err) {
        res.json(err);
        } else {
        res.json({ likes: image.likes });
        }
        });
        }
        }); 

       
    },
    comment:(req,res)=>{
       
        Models.Image.findOne({ filename: { $regex: req.params.imgId }},function(err, image) {
        if (!err && image) {
        var newComment = new Models.Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        newComment.save(function(err, comment) {
        if (err) { throw err; }
        res.redirect('/img/' + image.uniqueId + '#' + comment._id);
        });
        } else {
        res.redirect('/');
        }
        });




    },
    remove: async function(req, res) {
        console.log('remove fired');

        try{
            var image=await Models.Image.findOne({ filename: { $regex: req.params.imgId}});
            await Models.Comment.deleteOne({ image_id: image._id});
             await Models.Image.deleteOne({ _id: image._id});
            fs.unlink(path.resolve('./public/upload/' + image.filename),function(){
              res.json(true)
            })
          
            
            
            

        }
        catch(err){
            throw err
        }
       



    }
}