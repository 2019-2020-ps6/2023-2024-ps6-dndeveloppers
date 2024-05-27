const { Router } = require('express')
const ProfilRouter = require('./profils')
const StatsPatientRouter = require('./statsPatients')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/profils',ProfilRouter)
router.use('/stats',StatsPatientRouter)
module.exports = router