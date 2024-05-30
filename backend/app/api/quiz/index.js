const { Router } = require('express')

const { QuizModel, statsPatientModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizzes } = require('./manager')

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

module.exports = router