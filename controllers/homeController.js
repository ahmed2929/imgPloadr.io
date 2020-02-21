var sidebar =require('../helpers/sidebar');
var ImageModel = require('../models/index').Image
module.exports={
index:(req,res)=>{
    var viewModel={
        images: []
    }
   
    ImageModel.find({},{},{sort:{timestamp: -1}},(err,images)=>{

        if(err) throw err;
        viewModel.images=images;

        sidebar(viewModel, function(viewModel) {
            //console.log(viewModel)
            res.render('index', viewModel);
            });

    })


   

}
}