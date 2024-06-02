const { Router } = require('express')

const { ProfilModel, statsPatientModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildProfils } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const profils = buildProfils()
      res.status(200).json(profils)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    //console.log("body : ",req.body);
    const selfStats = statsPatientModel.create({...req.body.selfStats});
    //console.log("selfstats : ",selfStats);
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

router.put('/:profilId', (req, res) => {
  try {
    //console.log("selfStats : ",req.body.selfStats);
    
    const idProfil = req.params.profilId.substring(1); // on retire les ":" de :profilId
    const profil = ProfilModel.getById(idProfil);
    const idSelfStats = ProfilModel.getById(idProfil).selfStats
    //console.log("stats profil : ",statsPatientModel.getById(idSelfStats))
    req.body.selfStats = idSelfStats;
    //console.log("requête : ",req.body);
    //console.log("profil ancien : ",profil);
    res.status(200).json(ProfilModel.update(idProfil, req.body))
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})

router.delete('/:profilId', (req, res) => {
  try {
    const idProfil = req.params.profilId.substring(1); // on retire les ":" de :profilId
    const idSelfStats = ProfilModel.getById(idProfil).selfStats // on conserve l'ID des stats patients
    ProfilModel.delete(idProfil);
    //console.log("self : ",idSelfStats)
    statsPatientModel.delete(idSelfStats);
    res.status(204).end()
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})



module.exports = router