const { Router } = require('express')
const { QuestionModel, AnswerModel, IndiceModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuestions } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const questions = buildQuestions()
    res.status(200).json(questions)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const { label, answers, questionTexte, questionImage, indice, dejaPosee, optionImageLien, optionImageQuestion } = req.body

    const createdAnswers = answers.map(answer => AnswerModel.create(answer))
    const createdIndices = indice.map(ind => IndiceModel.create(ind))

    const question = QuestionModel.create({
      label,
      answers: createdAnswers.map(a => a.id),
      questionTexte,
      questionImage,
      indice: createdIndices.map(i => i.id),
      dejaPosee,
      optionImageLien,
      optionImageQuestion
    })

    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { label, answers, questionTexte, questionImage, indice, dejaPosee, optionImageLien, optionImageQuestion } = req.body

    const question = QuestionModel.getById(id)
    if (!question) {
      res.status(404).send('Question not found')
      return
    }

    question.answers.forEach(answerId => AnswerModel.deleteById(answerId))
    question.indice.forEach(indiceId => IndiceModel.deleteById(indiceId))

    const updatedAnswers = answers.map(answer => AnswerModel.create(answer))
    const updatedIndices = indice.map(ind => IndiceModel.create(ind))

    const updatedQuestion = QuestionModel.updateById(id, {
      label,
      answers: updatedAnswers.map(a => a.id),
      questionTexte,
      questionImage,
      indice: updatedIndices.map(i => i.id),
      dejaPosee,
      optionImageLien,
      optionImageQuestion
    })

    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const question = QuestionModel.getById(id)
    if (!question) {
      res.status(404).send('Question not found')
      return
    }

    question.answers.forEach(answerId => AnswerModel.deleteById(answerId))
    question.indice.forEach(indiceId => IndiceModel.deleteById(indiceId))

    QuestionModel.deleteById(id)

    res.status(204).send()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
