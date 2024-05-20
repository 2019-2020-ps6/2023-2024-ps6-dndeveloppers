const { Router } = require('express')
const ProfilRouter = require('./profils')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/profils',ProfilRouter)
module.exports = router