const { QuizModel, QuestionModel, AnswerModel, IndiceModel, statsQuizModel } = require('../../models')
const buildQuestion = require('./questions/manager')

const buildQuiz = (quizId) => {
  try {
    const quiz = QuizModel.getById(quizId)
    const questions = buildQuestion.filterQuestionsFromQuizz(quizId)
    for(let i=0; i< quiz.questions.length ;i++){
      const question = QuestionModel.getById(quiz.questions[i])
      questions.push((question) => buildQuestion(question))
    }
    const selfStats = statsQuizModel.getById(quiz.selfStats)
    console.log("test : ",{ ...quiz, questions, selfStats })
    return { ...quiz, questions, selfStats }
  } catch (err) {
    console.log(err)
    return {...quiz}
  }
  
}

const buildQuizzes = () => {
  const quizzes = QuizModel.get()
  console.log("quizzes : ",quizzes)
  return quizzes.map((quiz) => buildQuiz(quiz.id))
}

module.exports = {
  buildQuiz,
  buildQuizzes,
}