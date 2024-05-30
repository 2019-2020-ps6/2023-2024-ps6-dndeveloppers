const { Router } = require('express')
const { AnswerModel } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')

const router = new Router()

router.get('/:id', (req, res) => {
  try {
    const answer = AnswerModel.getById(req.body.params.substring(1)) 
    res.status(200).json(answer)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
try {
  const answer = AnswerModel.updateById(req.params.id.substring(1),req.body)
  res.status(200).json(answer)
} catch (err) {
  console.log(err)
  manageAllErrors(res, err)
}
})

router.delete('/:id', (req, res) => {
try {
  AnswerModel.delete(req.params.id.substring(1))
  res.status(204).end()
} catch (err) {
  console.log(err)
  manageAllErrors(res, err)
}
})

module.exports = router