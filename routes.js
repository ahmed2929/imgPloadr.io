var express=require('express');
var router=express.Router();
var homeController=require('./controllers/homeController');
var imgController=require('./controllers/imgController');
var userController=require('./controllers/user')
var multer=require('multer')
var path =require('path')
// upload file path
const FILE_PATH = path.join(__dirname,'public/upload/temp')

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`
});


module.exports=function(app){
    app.get('/user/login',userController.Getlogin)
    app.post('/user/login',userController.postLogin)
    app.get('/user/register',userController.getRegister)
    app.post('/user/register',userController.postRegister)
    app.get('/',homeController.index);
    app.get('/img/:imgId',imgController.index);
    app.post('/img/',upload.single('file'),imgController.create);
    app.post('/img/:imgId/like/',imgController.like);
    app.post('/img/:imgId/comment/',imgController.comment);
    app.delete('/img/:imgId', imgController.remove);

    app.use(router);


}
