const { Router } = require('express')

const { ProfilModel, statsPatientModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
      res.status(200).json(ProfilModel.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    console.log("body : ",req.body);

    const selfStats = statsPatientModel.create({...req.body.selfStats});
    console.log("selfstats : ",selfStats);
    req.body.selfStats = selfStats.id;
    const profil = ProfilModel.create({ ...req.body });

    selfStats.idStatsPatient = profil.id;
    console.log(profil);

    res.status(201).json(profil)
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})

router.delete('/:profilId', (req, res) => {
  try {
    const profil = ProfilModel.get(req.params.profilId);
    const idProfil = profil.at(0).id;
    const idSelfStats = ProfilModel.getById(idProfil).selfStats
    ProfilModel.delete(idProfil);
    statsPatientModel.delete(idSelfStats);
    
    res.status(204).end()
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})



module.exports = router