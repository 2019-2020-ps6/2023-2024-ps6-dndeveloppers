const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatsPatient', {
    options: Joi.array().required(),
    nbQuizDone: Joi.number().required(),
    meanScore: Joi.number().required(),
    quizRes: Joi.array().required(), 
    quizDone: Joi.array().required(),     
    idStatsPatient: Joi.number(),
})