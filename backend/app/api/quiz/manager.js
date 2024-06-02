const array = require('joi/lib/types/array')
const { QuizModel, QuestionModel, AnswerModel, IndiceModel, statsQuizModel } = require('../../models')
const buildQuestion = require('./questions/manager')

const buildQuiz = (quizId) => {
  try {
    const quiz = QuizModel.getById(quizId)
    const allQuestions = QuestionModel.get()
    let GoodQuestions = []
    for(let i=0;i<allQuestions.length;i++){
        if(allQuestions[i].idQuiz==quizId){
            // on ajoute bien les objets réponses à la questions
            let question = {
              label : allQuestions[i].label,
              answers : [],
              indice : [],
              optionImageLien : allQuestions[i].optionImageLien,
              optionImageQuestion : allQuestions[i].optionImageQuestion,
              idQuiz : allQuestions[i].idQuiz,
              id : allQuestions[i].id,
            }
            //console.log("question x avant : ",question);
            for(let j=0;j<allQuestions[i].answers.length;j++){
              question.answers.push(AnswerModel.getById(allQuestions[i].answers[j]));
            }
            for(let j=0;j<allQuestions[i].indice.length;j++){
              question.indice.push(IndiceModel.getById(allQuestions[i].indice[j]));
            }
            //console.log("question x : ",question);
            if(question.optionImageLien=="none"){
              question.optionImageLien="";
            }
            if(question.optionImageQuestion=="none"){
              question.optionImageQuestion="";
            }
            //console.log("question : ",question)
            GoodQuestions.push(question)
            
        }
    }
    const selfStats = statsQuizModel.getById(quiz.selfStats)
    //console.log("quiz construit : ",{ ...quiz, questions : GoodQuestions , selfStats })
    return { ...quiz, questions : GoodQuestions , selfStats }
  } catch (err) {
    console.log(err)
    return {...quiz}
  }
  
}

const buildQuizzes = () => {
  const quizzes = QuizModel.get()
  return quizzes.map((quiz) => buildQuiz(quiz.id))
}

module.exports = {
  buildQuiz,
  buildQuizzes,
}