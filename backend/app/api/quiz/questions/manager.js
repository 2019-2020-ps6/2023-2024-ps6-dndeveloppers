const { AnswerModel, IndiceModel, QuizModel } = require('../../../models')
const { QuestionModel } = require('../../../models')

const buildQuestion = (questionId) => {
  const question = QuestionModel.getById(questionId)
  const answer = []
  for(let i=0; i<4 ;i++){
    answer.push(AnswerModel.getById(question.answers[i].id))
  }
  const indices = []
  for(let i=0; i<4 ;i++){
    answer.push(IndiceModel.getById(question.indice[i].id))
  }
  return { ...question, answer, indices }
}

const QuestionDELETE = (questionsId) => {
    try {
        for(let i=0; i<4; i++){
            AnswerModel.delete(QuestionModel.getById(questionsId).answers[i].id);
        }
        for(let i=0; i< QuestionModel.getById(questionsId).indice.lenght; i++ ){
            IndiceModel.delete(QuestionModel.getById(questionsId).indice[i].id)
        }
        QuestionModel.delete(questionsId);
    } catch (err) {
        console.log(err)
    }
    
}

const QuestionsDELETE = (quizId) => {
    for(let i=0; i < QuizModel.getById(quizId).questions.lenght;i++){
        QuestionDELETE(QuizModel.getById(quizId).questions[i])
    }
}

const filterQuestionsFromQuizz = (quizId) => {
    const questions = QuestionModel.get()
    const parsedId = parseInt(quizId, 10)
    return questions.filter((question) => question.idQuiz === parsedId)
  }


module.exports = {
    buildQuestion,
    QuestionDELETE,
    QuestionsDELETE,
    filterQuestionsFromQuizz
}