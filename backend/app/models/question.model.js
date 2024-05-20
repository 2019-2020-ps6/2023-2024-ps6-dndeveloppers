const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    label: Joi.string().required(),
    answers: Joi.array().required(),
    questionTexte: Joi.boolean().required(),
    questionImage: Joi.boolean().required(), 
    indice: Joi.array().required(),

    dejaPosee: Joi.boolean(),

    optionImageLien: Joi.string(),
    optionImageQuestion: Joi.string(),

    idQuestion: Joi.number().required()
})