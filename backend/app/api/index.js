const { Router } = require('express')
const ProfilRouter = require('./profils')
const IndiceRouter = require('./indices')
const AnswerRouter = require('./answers')
const QuestionRouter = require('./questions')
const QuizRouter = require('./quiz')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/profils',ProfilRouter)
router.use('/indices',IndiceRouter)
router.use('/answers',AnswerRouter)
router.use('/questions',QuestionRouter)
router.use('/quiz',QuizRouter)

module.exports = router