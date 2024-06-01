const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    label: Joi.string().required(),
    answers: Joi.array(), 
    indice: Joi.array(),

    optionImageLien: Joi.string(),
    optionImageQuestion: Joi.string(),

    idQuiz: Joi.number().required(),
    id: Joi.number().required(),
})