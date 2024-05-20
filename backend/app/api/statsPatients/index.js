const { Router } = require('express')

const { statsPatientModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
      res.status(200).json(statsPatientModel.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const statsPatient = statsPatientModel.create({ ...req.body })
    res.status(201).json(statsPatient)
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})


module.exports = router