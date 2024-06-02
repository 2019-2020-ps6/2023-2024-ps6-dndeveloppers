const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Indice', {
    value: Joi.string().required(),
    id: Joi.number()
})