const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatsGlobales', {
    nbTotQuiz: Joi.number().required(),
    nbMeanQuizParPersonne: Joi.number().required(),
    nbDifferentQuiz: Joi.number().required(),
    nbPatient: Joi.number().required(), 

    idStatsGlobales: Joi.number().required()
})