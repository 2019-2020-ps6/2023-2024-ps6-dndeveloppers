import { test, expect } from '@playwright/test';
import { ListProfilFixture } from 'src/app/Profil/listProfil/listProfil.fixture';
import { testUrl } from 'e2e/e2e.config';
import { CreateProfilFixture } from 'src/app/Profil/createProfil/createProfil.fixture';

test.describe('Create personnel profil', () => {
  test('Basic test', async ({ page }) => {
    // Aller à l'URL spécifiée
    await page.goto(testUrl + '/home/listProfil');

    // Créer une instance du fixture ListProfilFixture
    const listProfilFixture = new ListProfilFixture(page);
    const createProfilFixture = new CreateProfilFixture(page);

    // Vérifier que le champ de recherche des patients est présent
    const searchBarPatient = await listProfilFixture.getSearchBarPatient();
    await expect(searchBarPatient).toBeVisible();

    // Vérifier que le champ de recherche du personnel est présent
    const searchBarStaff = await listProfilFixture.getSearchBarStaff();
    await expect(searchBarStaff).toBeVisible();

    // Cliquer sur le bouton Ajouter un profil
    await listProfilFixture.clickAddProfilButton();

    // Vérifier que le champ Nom est présent
    const nomInput = await createProfilFixture.getNomInput();
    await expect(nomInput).toBeVisible();

    // Vérifier que le champ Prénom est présent
    const prenomInput = await createProfilFixture.getPrenomInput();
    await expect(prenomInput).toBeVisible();

    // Vérifier que le champ Role est présent
    const roleInput = await createProfilFixture.getRoleInput();
    await expect(roleInput).toBeVisible();

    // Vérifier que le champ Jour est présent
    const jourInput = await createProfilFixture.getJourInput();
    await expect(jourInput).toBeVisible();

    // Vérifier que le champ Mois est présent
    const moisInput = await createProfilFixture.getMoisInput();
    await expect(moisInput).toBeVisible();

    // Vérifier que le champ Année est présent
    const anneeInput = await createProfilFixture.getAnneeInput();
    await expect(anneeInput).toBeVisible();

    // Vérifier que l'option Photo est présente
    const optionPhoto = await createProfilFixture.getOptionPhoto();
    await expect(optionPhoto).toBeVisible();

    // Vérifier que l'option Indice est présente
    const optionIndice = await createProfilFixture.getOptionIndice();
    await expect(optionIndice).toBeVisible();

    // Vérifier que l'option Disparaitre est présente
    const optionDisparaitre = await createProfilFixture.getOptionDisparaitre();
    await expect(optionDisparaitre).toBeVisible();

    // Vérifier que l'option Reposer est présente
    const optionReposer = await createProfilFixture.getOptionReposer();
    await expect(optionReposer).toBeVisible();

    // Vérifier que l'option Temps est présente
    const optionTemps = await createProfilFixture.getOptionTemps();
    await expect(optionTemps).toBeVisible();

    // Vérifier que l'option Taille est présente
    const optionTaille = await createProfilFixture.getOptionTaille();
    await expect(optionTaille).toBeVisible();

    // Ecrire dans le champ Nom
    await nomInput.fill('Heilmann');

    // Ecrire dans le champ Prénom
    await prenomInput.fill('Hugo');

    // Choisir une option dans le champ Role
    await roleInput.selectOption({ label: 'patient' });

    // Choisir une option dans le champ Jour
    await jourInput.selectOption({ label: '10' });

    // Choisir une option dans le champ Mois
    await moisInput.selectOption({ label: 'janvier' });

    // Ecire dans le champ Année
    await anneeInput.fill('2000');

    // Cliquer sur la checkbox de l'option Photo
    await optionPhoto.check();

    // Cliquer sur la checkbox de l'option Indice
    await optionIndice.check();

    // Cliquer sur la checkbox de l'option Disparaitre
    await optionDisparaitre.check();

    // Cliquer sur ajouter le profil
    await createProfilFixture.clickAjouterLeProfil();

    // Vérifier que le profil a bien été ajouté
    const profil = await page.getByRole('heading', { name: 'Nom : Heilmann Prénom: Hugo Afficher Modifier Supprimer' });

    // Supprimer le profil
    await listProfilFixture.clickSupprimerLeProfil();
  });
});
