const { Router } = require('express')
const ProfilRouter = require('./profils')
const StatsPatientRouter = require('./statsPatients')
const QuizRouter = require('./quiz')
const QuestionRouter = require('./quiz/questions')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/profils',ProfilRouter)
router.use('/stats',StatsPatientRouter)
router.use('/quiz',QuizRouter)
router.use('/question',QuestionRouter)
module.exports = router