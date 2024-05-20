const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Profil', {
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    role: Joi.string().required(),
    photo: Joi.string().required(), // le lien de la photo de profil sinon par défault

    dateNaissance: Joi.array(),

    optionPhoto: Joi.boolean().required(), // avoir le droit à des questions avec des photos
    optionIndice: Joi.boolean().required(), // avoir le droit d'utiliser des indices

    optionSupprimerMauvaisesReponses: Joi.boolean().required(),
    optionReposerQuestionApres: Joi.boolean().required(),

    optionTailleTexte: Joi.string().required(), // Petit, Moyen ou Grand

    tutoriel: Joi.boolean().required(), // Pour savoir s'il faut afficher le tutoriel

    idProfil: Joi.number(),
    selfStats: Joi.number() // selfStats: statsPatient
})