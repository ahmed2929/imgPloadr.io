var models = require('../models/index')

module.exports = {
    popular: async function() {
        
        var popular =await models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }});

            return popular

    }
    };