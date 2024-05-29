const { Router } = require('express')
const { QuizModel, QuestionModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizzes } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const { name, theme, questions, nbQuestionsPerType, selfStats, photo } = req.body

    const quiz = QuizModel.create({
      name,
      theme,
      questions,
      nbQuestionsPerType,
      selfStats,
      photo
    })

    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { name, theme, questions, nbQuestionsPerType, selfStats, photo } = req.body

    const updatedQuiz = QuizModel.updateById(id, {
      name,
      theme,
      questions,
      nbQuestionsPerType,
      selfStats,
      photo
    })

    if (!updatedQuiz) {
      res.status(404).send('Quiz not found')
      return
    }

    res.status(200).json(updatedQuiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const deletedQuiz = QuizModel.deleteById(id)

    if (!deletedQuiz) {
      res.status(404).send('Quiz not found')
      return
    }

    res.status(204).send()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
