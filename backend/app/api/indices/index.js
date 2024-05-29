const { Router } = require('express')
const { IndiceModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(IndiceModel.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const { value } = req.body

    const indice = IndiceModel.create({ value })

    res.status(201).json(indice)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { value } = req.body

    const updatedIndice = IndiceModel.updateById(id, { value })

    if (!updatedIndice) {
      res.status(404).send('Indice not found')
      return
    }

    res.status(200).json(updatedIndice)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    const deletedIndice = IndiceModel.deleteById(id)

    if (!deletedIndice) {
      res.status(404).send('Indice not found')
      return
    }

    res.status(204).send()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
