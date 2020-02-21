
/////////////////////////////// declearing medileware/////////////////////////////////////////////////
const morgan=require('morgan'); //This is the module responsible for logging. This is very helpful for debguing
const bodyParser=require('body-parser');
var methodOverride=require('method-override'); //For older browsers that don't properly support REST http verbs
var cookieParser =require('cookie-parser') ; //to deal with cookies
var errorHandler =require('errorhandler'); //This handles any errors that occur throughout the entire middleware process
var expHandlebars =require('express-handlebars'); // templating engine
var path=require('path');
var express =require('express');
var routes = require('../routes');
var moment = require('moment');
var session=require('express-session')
var mongoStore=require('connect-mongodb-session')(session)
var passport=require('passport')
var mongoose = require('mongoose');
var User=require('../models/user')

/////////////////////////////// end declearing medileware/////////////////////////////////////////////////

module.exports= function (app){
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());
//app.use(multer({dest:__dirname+'public/upload/temp'}).single('img'));  
app.use(methodOverride());
app.use(cookieParser('AK'));
app.use((req,res,next)=>{

req.IsLogin=false;
next();

})

// set up session

// app.use(session({
//     name:'sessionID',
//     secret:'ak',
//     saveUninitialized:false, //dont create session for un loged users
//     resave:false,// dont save unliss modified
    
//     store: new mongoStore({           //where to save
//         mongooseConnection:mongoose.connection,
//         ttl:60*60*24*1, // one day
//         collection:session,
//         cookie:{
//             secure:false,
//             httpOnly:false,
//             expires:new Date(Date.now+60*60*1000) //one hour
//         }

//     })
// }))


// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     next();
//   });
  
  // app.use((req, res, next) => {
   
  //   if (!req.session.user) {
  //     return next();
  //   }
  //   User.findById(req.session.user._id)
  //     .then(user => {
  //       if (!user) {
  //         return next();
  //       }
  //       req.user = user;
  //       next();
  //     })
  //     .catch(err => {
  //       next(new Error(err));
  //     });
  // });


app.use('/public/', express.static(path.join(__dirname,'../public'))); //serving static files

//app.use(multer({ dest: path.join(__dirname,'public/upload/temp')})).single('photo')

//app.use(multer({dest: path.join(__dirname,'public/upload/temp')}).single('file'));

//app.use(multer({dest:__dirname+'public/upload/temp'}).single('img'));

if('development'===app.get('env')){

    app.use(errorHandler());

}

app.engine('handlebars', expHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    allowedProtoMethods: {
        trim: true
      },
    helpers: {
        timeago: function(timestamp) {
        return moment(timestamp).startOf('minute').fromNow();
        }
        }
    }).engine);
    
    app.set('view engine', 'handlebars');

    routes(app);
    return app;




}