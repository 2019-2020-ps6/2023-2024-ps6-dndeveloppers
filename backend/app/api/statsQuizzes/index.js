const { Router } = require('express')

const { statsQuizModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
      res.status(200).json(statsQuizModel.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const statsQuiz = statsQuizModel.create({ ...req.body })
    res.status(201).json(statsQuiz)
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})


module.exports = router