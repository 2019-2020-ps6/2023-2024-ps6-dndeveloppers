const { Router } = require('express')
const { AnswerModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.put('/:id', (req, res) => {
  try {
    const updatedAnswer = AnswerModel.updateById(req.params.id.substring(1),req.body)

    if (!updatedAnswer) {
      res.status(404).send('Answer not found')
      return
    }

    res.status(200).json(updatedAnswer)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

module.exports = router