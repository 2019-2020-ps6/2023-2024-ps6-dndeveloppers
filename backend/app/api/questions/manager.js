const { QuestionModel, AnswerModel, IndiceModel } = require('../../models')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuestion = (questionId) => {
  const question = QuestionModel.getById(questionId)
  const answers = AnswerModel.getById(question.answers)
  const indice = IndiceModel.getById(question.indice)
  return { ...question, answers, indice}
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuestions = () => {
  const questions = QuestionModel.get()
  return questions.map((question) => buildQuestion(question.id))
}

module.exports = {
  buildQuestion,
  buildQuestions,
}