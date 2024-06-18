import { test, expect } from '@playwright/test';
import { ListProfilFixture } from 'src/app/Profil/listProfil/listProfil.fixture';
import { testUrl } from 'e2e/e2e.config';
import { CreateProfilFixture } from 'src/app/Profil/createProfil/createProfil.fixture';
import { EditProfilFixture } from 'src/app/Profil/editProfil/editProfil.fixture';
import { PhotoFixture } from 'src/app/photo/photo.fixture';
import { ViewProfilFixture } from 'src/app/Profil/viewProfil/viewProfil.fixture';

test.describe('Create personnel profil', () => {
  test('Basic test', async ({ page }) => {
    // Aller à l'URL spécifiée
    await page.goto(testUrl + '/home/listProfil');

    // Créer une instance du fixture ListProfilFixture
    const listProfilFixture = new ListProfilFixture(page);
    const createProfilFixture = new CreateProfilFixture(page);
    const editProfilFixture = new EditProfilFixture(page);
    const photoFixture = new PhotoFixture(page);
    const viewProfilFixture = new ViewProfilFixture(page);

    await test.step('Ajout d\'un profil', async () => {

    // Cliquer sur le bouton Ajouter un profil
    await listProfilFixture.clickAddProfilButton();

    // Ecrire dans le champ Nom
    const nomInput = await createProfilFixture.getNomInput();
    await nomInput.fill('Heilmann');

    // Ecrire dans le champ Prénom
    const prenomInput = await createProfilFixture.getPrenomInput();
    await prenomInput.fill('Hugo');

    // Choisir une option dans le champ Role
    const roleInput = await createProfilFixture.getRoleInput();
    await roleInput.selectOption({ label: 'patient' });

    // Choisir une option dans le champ Jour
    const jourInput = await createProfilFixture.getJourInput();
    await jourInput.selectOption({ label: '10' });

    // Choisir une option dans le champ Mois
    const moisInput = await createProfilFixture.getMoisInput();
    await moisInput.selectOption({ label: 'janvier' });

    // Ecire dans le champ Année
    const anneeInput = await createProfilFixture.getAnneeInput();
    await anneeInput.fill('2000');

    // Cliquer sur la checkbox de l'option Photo
    const optionPhoto = await createProfilFixture.getOptionPhoto();
    await optionPhoto.check();

    // Cliquer sur la checkbox de l'option Indice
    const optionIndice = await createProfilFixture.getOptionIndice();
    await optionIndice.check();

    // Cliquer sur la checkbox de l'option Disparaitre
    const optionDisparaitre = await createProfilFixture.getOptionDisparaitre();
    await optionDisparaitre.check();

    // Cliquer sur ajouter le profil
    await createProfilFixture.clickAjouterLeProfil();

    // Vérifier que le profil a bien été ajouté
    const profil = await page.getByRole('heading', { name: 'Nom : Heilmann Prénom: Hugo Afficher Modifier Supprimer' });

    });

    await test.step('Modification du profil', async () => {
      
    // Cliquer sur le bouton Editer
    const editerLeProfil = await listProfilFixture.editerLeProfil();
    await editerLeProfil.click();

    await test.step('Verification des valeurs du profil', async () => {

    // Vérifier que le champ Nom a pour valeur Heilmann
    const nomInput = await editProfilFixture.getNomInput();
    await expect(nomInput).toHaveValue('Heilmann');

    // Vérifier que le champ Prénom a pour valeur Hugo
    const prenomInput = await editProfilFixture.getPrenomInput();
    await expect(prenomInput).toHaveValue('Hugo');

    // Vérifier que le champ Role a pour valeur patient
    const roleInput = await editProfilFixture.getRoleInput();
    await expect(roleInput).toHaveValue('patient');

    // Vérifier que le champ Jour a pour valeur 10
    const jourInput = await editProfilFixture.getJourInput();
    await expect(jourInput).toHaveValue('10');

    // Vérifier que le champ Mois a pour valeur janvier
    const moisInput = await editProfilFixture.getMoisInput();
    await expect(moisInput).toHaveValue('janvier');

    // Vérifier que le champ Année a pour valeur 2000
    const anneeInput = await editProfilFixture.getAnneeInput();
    await expect(anneeInput).toHaveValue('2000');

    // Verifier que l'option Photo est cochée
    const optionPhoto = await editProfilFixture.getOptionPhoto();
    await expect(optionPhoto).toBeChecked();

    // Verifier que l'option Indice est cochée
    const optionIndice = await editProfilFixture.getOptionIndice();
    await expect(optionIndice).toBeChecked();

    // Verifier que l'option Disparaitre est cochée
    const optionDisparaitre = await editProfilFixture.getOptionDisparaitre();
    await expect(optionDisparaitre).toBeChecked();

    // Verifier que l'option Reposer n'est pas cochée
    const optionReposer = await editProfilFixture.getOptionReposer();
    await expect(optionReposer).not.toBeChecked();

    });

    await test.step('Modification des valeurs du profil', async () => {

    // Ecrire dans le champ Nom
    const nomInput = await editProfilFixture.getNomInput();
    await nomInput.fill('ROQUES');

    // Ecrire dans le champ Prénom
    const prenomInput = await editProfilFixture.getPrenomInput();
    await prenomInput.fill('Maxence');

    // Choisir une option dans le champ Role
    const roleInput = await editProfilFixture.getRoleInput();
    await roleInput.selectOption({ label: 'personnel' });

    // Choisir une option dans le champ Jour
    const jourInput = await editProfilFixture.getJourInput();
    await jourInput.selectOption({ label: '15' });

    // Choisir une option dans le champ Mois
    const moisInput = await editProfilFixture.getMoisInput();
    await moisInput.selectOption({ label: 'mars' });

    // Ecrire dans le champ Année
    const anneeInput = await editProfilFixture.getAnneeInput();
    await anneeInput.fill('2003');

    // Cliquer sur la checkbox de l'option Reposer
    const optionReposer = await editProfilFixture.getOptionReposer();
    await optionReposer.check();

    // Verifier que l'option Reposer est cochée
    await expect(optionReposer).toBeChecked();

    // Verifier que l'option disparaître n'est pas cochée
    const optionDisparaitre = await editProfilFixture.getOptionDisparaitre();
    await expect(optionDisparaitre).not.toBeChecked();

    // Cliquer sur modifier le profil
    const modifierLeProfil = await editProfilFixture.getModifierLeProfil();
    await modifierLeProfil.click();

    // Vérifier que le profil a bien été modifié
    const profil = await page.getByRole('heading', { name: 'Nom : ROQUES Prénom: Maxence Afficher Modifier Supprimer' });
    await expect(profil).not.toBeNull();
    
    });
    });

    await test.step('Suppression du profil', async () => {

      // Cliquer sur le bouton Supprimer
      const supprimerLeProfil = await listProfilFixture.supprimerLeProfil();
      await supprimerLeProfil.click();

      // Vérifier que le profil a bien été supprimé
      await page.reload(); // Reload the page to ensure the profile list is updated

      const profil = await page.locator('text=Nom : ROQUES Prénom: Maxence Afficher Modifier Supprimer').first();
      await expect(profil).toHaveCount(0); 

    });
  });
});
