const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatsQuiz', {
    playedTime: Joi.number().required(),
    meanScore: Joi.number().required(),
    meanHintUsed: Joi.number().required(),
    resTab: Joi.array().required(), 
    nbHintUsed: Joi.array().required(), 
    successPercentageByQuestion: Joi.array().required(), 
    id: Joi.number().required()
})