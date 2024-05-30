const { ProfilModel, statsPatientModel } = require('../../models')

const buildProfil = (profilId) => {
  const profil = ProfilModel.getById(profilId)
  const selfStats = statsPatientModel.getById(profil.selfStats)
  return { ...profil, selfStats }
}

const buildProfils = () => {
  const profils = ProfilModel.get()
  return profils.map((profil) => buildProfil(profil.id))
}

module.exports = {
  buildProfil,
  buildProfils,
}