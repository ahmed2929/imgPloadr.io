var user=require('../models/user');
var bcrypt=require('bcryptjs');
module.exports={
    Getlogin:(req,res)=>{

        res.render('login')


    },
    postLogin:async(req,res)=>{
    
        var signeduser=await user.findOne({email:req.body.email});
        if(!signeduser){
            res.render('login',{message:'no such email found'});
        }else{

          var result=await  bcrypt.compare(req.body.password, signeduser.password)
            if(result){
                req.IsLogin=true;
                res.redirect('/')
            }else{

                res.render('login',{message:'invalid password'})
            }

        }






    },
    getRegister:(req,res)=>{
        res.render('register')
    },
    postRegister:async(req,res)=>{
        try{
            var fuser=await user.findOne({email:req.body.email})
           if(fuser){
                res.redirect('login') 
           }else{
            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(req.body.password, salt, function(err, hash) {
                                     var newUser=new user({
                                         email:req.body.email,
                                         fname:req.body.fname,
                                         lname:req.body.lname,
                                         password:hash
        
        
                                     })
                                     newUser.save();
                                     res.redirect('login') 
                    
                                 });
                             });
           } 
        }
        catch(err){
            console.log("err : "+err)
        }
          
        
    }

}