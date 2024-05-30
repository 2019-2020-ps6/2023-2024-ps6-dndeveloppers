const { QuizModel, QuestionModel, AnswerModel, IndiceModel, statsQuizModel } = require('../../models')

const buildQuiz = (quizId) => {
  const quiz = QuestionModel.getById(quizId)
  const selfStats = statsPatientModel.getById(profil.selfStats)
  return { ...profil, selfStats }
}

const buildQuizzes = () => {
  const profils = ProfilModel.get()
  return profils.map((profil) => buildProfil(profil.id))
}

module.exports = {
  buildQuiz,
  buildQuizzes,
}