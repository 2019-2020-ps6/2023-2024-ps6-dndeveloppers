const { Router } = require('express')
const { statsQuizModel } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')

const router = new Router()

router.put('/:id', (req, res) => {
try {
    const stats = statsQuizModel.updateById(req.params.id.substring(1),req.body)
    res.status(200).json(indice)
} catch (err) {
    console.log(err)
    manageAllErrors(res, err)
}
})

module.exports = router