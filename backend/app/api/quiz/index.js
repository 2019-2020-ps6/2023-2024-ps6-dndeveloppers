const { Router } = require('express')

const { QuizModel, statsQuizModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizzes } = require('./manager')
const { QuestionsDELETE } = require('./questions/manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const quizzes = buildQuizzes()
      res.status(200).json(quizzes)
    } catch (err) {
      console.log(err)
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    console.log("body : ",req.body)
    const stats = statsQuizModel.create({...req.body.selfStats});
    const idStats = stats.id
    
    req.body.selfStats = idStats;
    console.log("quiz : ",req.body)
    const quiz = QuizModel.create({...req.body})
    res.status(200).json(quiz)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.put('/', (req, res) => {
  try {
    console.log("body : ",req.body)
    const stats = statsQuizModel.create({...req.body.selfStats});
    const idStats = stats.id
    
    req.body.selfStats = idStats;
    console.log("quiz : ",req.body)
    const quiz = QuizModel.create({...req.body})
    res.status(200).json(quiz)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    const idQuiz = req.params.quizId.substring(1); 
    const quiz = QuizModel.getById(idQuiz)
    const idSelfStats = statsQuizModel.getById(quiz.selfStats).id
    const idQuestions = []
    for(let i=0; i< quiz.questions.length;i++){
      idQuestions.push(quiz.questions[i]);
    }

    console.log("quiz : ",quiz)
    console.log("stats : ",statsQuizModel.getById(quiz.selfStats))
    QuestionsDELETE(idQuiz);
    QuizModel.delete(idQuiz);
    console.log("ok")
    statsQuizModel.delete(idSelfStats);
    

    res.status(204).end()
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})

module.exports = router