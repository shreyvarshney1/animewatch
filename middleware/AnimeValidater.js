const Joi = require('joi'); // https://joi.dev/api/?v=17.7.0

function animevalidater(anime){
    const schema = Joi.object({
        AnimeName: Joi.string().min(3).required(),
        Link : Joi.string().required()
    });
    return schema.validate(anime); 
}

module.exports = animevalidater;