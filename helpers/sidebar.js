var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comments');

module.exports = async function(viewModel, callback){
   

try{
    viewModel.sidebar = {
        stats: await Stats(),
        popular: await Images.popular(),
        comments: await Comments.newest()
        };

       // console.log('from slidbar'+viewModel.comments)
        callback(viewModel);
}
  catch (err){
      throw err;
  }  
   
    }