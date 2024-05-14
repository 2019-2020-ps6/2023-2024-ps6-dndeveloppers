const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    name: Joi.string().required(),
    theme: Joi.string().required(),
    questions: Joi.array().required(),
    nbQuestionsPerType: Joi.array().required(), 
    id: Joi.number().required(),

    selfStats: Joi.array(),
    photo: Joi.string(),

    idQuiz: Joi.number().required()
})