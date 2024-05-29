const { QuestionModel, QuizModel, statsQuizModel } = require('../../models')

/**
 * Function buildQuiz.
 * This function aggregates the questions and answers from the database to build a quiz with all the data needed by the clients.
 * @param quizId
 */
const buildQuiz = (quizId) => {
  const quiz = QuizModel.getById(quizId)
  const questions = quiz.questions.map(questionId => QuestionModel.getById(questionId))
  const selfStats = statsQuizModel.getById(quiz.selfStats)

  return { ...quiz, questions, selfStats }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = QuizModel.get()
  return quizzes.map((quiz) => buildQuiz(quiz.id))
}

module.exports = {
  buildQuiz,
  buildQuizzes,
}
