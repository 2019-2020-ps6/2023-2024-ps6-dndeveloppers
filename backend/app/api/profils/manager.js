const { ProfilModel, statsPatientModel } = require('../../models')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildProfil = (profilId) => {
  const profil = ProfilModel.getById(profilId)
  const selfStats = statsPatientModel.getById(profil.selfStats)
  return { ...profil, selfStats }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildProfils = () => {
  const profils = ProfilModel.get()
  return profils.map((profil) => buildProfil(profil.id))
}

module.exports = {
  buildProfil,
  buildProfils,
}