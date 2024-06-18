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

    await test.step('Verification du layout de la page listProfil', async () => {
      // Vérifier que le champ de recherche des patients est présent
      const searchBarPatient = await listProfilFixture.getSearchBarPatient();
      await expect(searchBarPatient).toBeVisible();
  
      // Vérifier que le champ de recherche du personnel est présent
      const searchBarStaff = await listProfilFixture.getSearchBarStaff();
      await expect(searchBarStaff).toBeVisible();
  
    });

    // Cliquer sur le bouton Ajouter un profil
    await listProfilFixture.clickAddProfilButton();

    await test.step('Verification du layout de la page createProfil', async () => {
    
        // Vérifier que le champ Nom est présent
        const nomInput2 = await createProfilFixture.getNomInput();
        await expect(nomInput2).toBeVisible();
    
        // Vérifier que le champ Prénom est présent
        const prenomInput2 = await createProfilFixture.getPrenomInput();
        await expect(prenomInput2).toBeVisible();
    
        // Vérifier que le champ Role est présent
        const roleInput2 = await createProfilFixture.getRoleInput();
        await expect(roleInput2).toBeVisible();
    
        // Vérifier que le champ Jour est présent
        const jourInput2 = await createProfilFixture.getJourInput();
        await expect(jourInput2).toBeVisible();
    
        // Vérifier que le champ Mois est présent
        const moisInput2 = await createProfilFixture.getMoisInput();
        await expect(moisInput2).toBeVisible();
    
        // Vérifier que le champ Année est présent
        const anneeInput2 = await createProfilFixture.getAnneeInput();
        await expect(anneeInput2).toBeVisible();
    
        // Vérifier que l'option Photo est présente
        const optionPhoto2 = await createProfilFixture.getOptionPhoto();
        await expect(optionPhoto2).toBeVisible();
    
        // Vérifier que l'option Indice est présente
        const optionIndice2 = await createProfilFixture.getOptionIndice();
        await expect(optionIndice2).toBeVisible();
    
        // Vérifier que l'option Disparaitre est présente
        const optionDisparaitre2 = await createProfilFixture.getOptionDisparaitre();
        await expect(optionDisparaitre2).toBeVisible();
    
        // Vérifier que l'option Reposer est présente
        const optionReposer2 = await createProfilFixture.getOptionReposer();
        await expect(optionReposer2).toBeVisible();
    
        // Vérifier que l'option Temps est présente
        const optionTemps2 = await createProfilFixture.getOptionTemps();
        await expect(optionTemps2).toBeVisible();
    
        // Vérifier que l'option Taille est présente
        const optionTaille2 = await createProfilFixture.getOptionTaille();
        await expect(optionTaille2).toBeVisible();

    });

    await test.step('Ajout d\'un profil', async () => {

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
      });

    await test.step('Verification Search-bar', async () => {
      // Ecrire dans le champ de recherche des patients
      const searchBarPatient = await listProfilFixture.getSearchBarPatient();
      await searchBarPatient.fill('Heilmann');

      // Vérifier que le profil est bien présent
      const profil = await page.locator('text=Nom : Heilmann Prénom: Hugo Afficher Modifier Supprimer').first();
      await expect(profil).not.toBeNull();

      // Ecrire qqch de faux dans le champ de recherche des patients
      await searchBarPatient.fill('test');

      // Vérifier que le profil n'est pas présent
      const profil2 = await page.locator('text=Nom : Heilmann Prénom: Hugo Afficher Modifier Supprimer').first();
      await expect(profil2).not.toBeVisible();

      // Vider le champ de recherche des patients
      await searchBarPatient.fill('');

    });

    await test.step('Afficher profil', async () => {

      // Cliquer sur le bouton Afficher
      const afficherLeProfil = await listProfilFixture.afficherLeProfil();
      await afficherLeProfil.click();

      // Jouer depuis le profil
      const jouerButton = await listProfilFixture.getJouerButton();
      await jouerButton.click();

    });




  });
});
