const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Profil', {
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    role: Joi.string().required(),
    photo: Joi.string().required(), // le lien de la photo de profil sinon par défault

    dateNaissance: [
        Joi.number().required(),
        Joi.number().required(),
        Joi.number().required()
    ],

    optionPhoto: Joi.boolean(), // avoir le droit à des questions avec des photos
    optionIndice: Joi.boolean(), // avoir le droit d'utiliser des indices

    optionSupprimerMauvaisesReponses: Joi.boolean(),
    optionReposerQuestionApres: Joi.boolean(),

    optionTailleTexte: Joi.string(), // Petit, Moyen ou Grand

    tutoriel: Joi.boolean(), // Pour savoir s'il faut afficher le tutoriel

    // selfStats: statsPatient
})