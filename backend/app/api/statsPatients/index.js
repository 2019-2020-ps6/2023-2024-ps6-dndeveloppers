const { Router } = require('express')

const { statsPatientModel, ProfilModel } = require('../../models')
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

router.put('/:profilId', (req, res) => {
  try{
    const idProfil = req.params.profilId.substring(1); // on enlève les ":" de :profilId
    const profil = ProfilModel.getById(idProfil);
    console.log("requête : ", req.body);
    res.status(200).json(statsPatientModel.update(profil.selfStats));
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
})

router.delete('/:profilId', (req, res) => {
  try {
    const idProfil = req.params.profilId.substring(1); // on retire les ":" de :profilId
    const idSelfStats = ProfilModel.getById(idProfil).selfStats;
    statsPatientModel.delete(idSelfStats);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err);
  }
})


module.exports = router