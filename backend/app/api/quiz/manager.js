const { QuestionModel, QuizModel } = require('../../models')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuiz = (quizId) => {
  const quiz = QuizModel.getById(quizId)
  const question = QuestionModel.getById(quiz.question)
  return { ...quiz, question}
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