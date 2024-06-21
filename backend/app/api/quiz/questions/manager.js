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
  //console.log("question x : ",{ ...question, answer, indices })
  return { ...question, answer, indices }
}

const buildQuestions = (idQuiz) => {
    const questions = QuestionModel.get()
    const GoodQuestions = []
    for(let i=0;i<questions.length;i++){
        if(questions[i].idQuiz==idQuiz){
            GoodQuestions.push(questions[i]);
        }
    }
    //console.log("goodQuestions :",GoodQuestions)
    return GoodQuestions.map((question) => buildQuestion(question.id))
}


const QuestionDELETE = (questionsId) => {
    try {
        const question = QuestionModel.getById(questionsId);
        console.log("question id : ",question.id)
        for(let i=0; i<4; i++){
            console.log("question.answers[i].id : ",question.answers[i])
            AnswerModel.delete(question.answers[i]);
        }
        for(let i=0; i< question.indice.length; i++ ){
            console.log("question.indice[i].id : ",question.indice[i])
            IndiceModel.delete(question.indice[i])
        }
        QuestionModel.delete(questionsId);
    } catch (err) {
        console.log(err)
    }
    
}

const QuestionsDELETE = (quizId) => {
    const questions = QuizModel.getById(quizId).questions;
    //console.log("questions : ",questions)
    for(let i=0; i < questions.length;i++){
        console.log("questions[i] : ",questions[i])
        console.log("question : ", QuestionModel.getById(questions[i]).label);
        
        QuestionDELETE(questions[i])
    }
}


module.exports = {
    buildQuestion,
    buildQuestions,
    QuestionDELETE,
    QuestionsDELETE,
}