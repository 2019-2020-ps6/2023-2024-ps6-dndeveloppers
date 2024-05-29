const { Router } = require('express')
const { AnswerModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(AnswerModel.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const { value, isCorrect } = req.body

    const answer = AnswerModel.create({ value, isCorrect })

    res.status(201).json(answer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { value, isCorrect } = req.body

    const updatedAnswer = AnswerModel.updateById(id, { value, isCorrect })

    if (!updatedAnswer) {
      res.status(404).send('Answer not found')
      return
    }

    res.status(200).json(updatedAnswer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const deletedAnswer = AnswerModel.deleteById(id)

    if (!deletedAnswer) {
      res.status(404).send('Answer not found')
      return
    }

    res.status(204).send()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
