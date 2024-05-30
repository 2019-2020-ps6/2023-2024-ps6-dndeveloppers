const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    name: Joi.string().required(),
    theme: Joi.string().required(),

    questions: Joi.array(),
    id: Joi.number(),
    selfStats: Joi.number(),

    photo: Joi.string(),
})