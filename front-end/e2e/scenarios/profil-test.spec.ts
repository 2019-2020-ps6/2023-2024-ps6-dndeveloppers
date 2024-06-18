import { test, expect } from '@playwright/test';
import { ListProfilFixture } from 'src/app/Profil/listProfil/listProfil.fixture';
import { testUrl } from 'e2e/e2e.config';
import { CreateProfilFixture } from 'src/app/Profil/createProfil/createProfil.fixture';
import { EditProfilFixture } from 'src/app/Profil/editProfil/editProfil.fixture';
import { PhotoFixture } from 'src/app/photo/photo.fixture';

test.describe('Profil Layout Affichage', () => {
    test('Basic test', async ({ page }) => {
        // Aller à l'URL spécifiée
        await page.goto(testUrl + '/home/listProfil');
    
        // Créer une instance du fixture ListProfilFixture
        const listProfilFixture2 = new ListProfilFixture(page);
        const createProfilFixture2 = new CreateProfilFixture(page);
        const editProfilFixture2 = new EditProfilFixture(page);

        await test.step('Verification du layout de la page listProfil', async () => {
            // Vérifier que le champ de recherche des patients est présent
            const searchBarPatient = await listProfilFixture2.getSearchBarPatient();
            await expect(searchBarPatient).toBeVisible();
        
            // Vérifier que le champ de recherche du personnel est présent
            const searchBarStaff = await listProfilFixture2.getSearchBarStaff();
            await expect(searchBarStaff).toBeVisible();
        
        });

        // Cliquer sur le bouton Ajouter un profil
        await listProfilFixture2.clickAddProfilButton();

        await test.step('Verification du layout de la page createProfil', async () => {
        
            // Vérifier que le champ Nom est présent
            const nomInput2 = await createProfilFixture2.getNomInput();
            await expect(nomInput2).toBeVisible();
        
            // Vérifier que le champ Prénom est présent
            const prenomInput2 = await createProfilFixture2.getPrenomInput();
            await expect(prenomInput2).toBeVisible();
        
            // Vérifier que le champ Role est présent
            const roleInput2 = await createProfilFixture2.getRoleInput();
            await expect(roleInput2).toBeVisible();
        
            // Vérifier que le champ Jour est présent
            const jourInput2 = await createProfilFixture2.getJourInput();
            await expect(jourInput2).toBeVisible();
        
            // Vérifier que le champ Mois est présent
            const moisInput2 = await createProfilFixture2.getMoisInput();
            await expect(moisInput2).toBeVisible();
        
            // Vérifier que le champ Année est présent
            const anneeInput2 = await createProfilFixture2.getAnneeInput();
            await expect(anneeInput2).toBeVisible();
        
            // Vérifier que l'option Photo est présente
            const optionPhoto2 = await createProfilFixture2.getOptionPhoto();
            await expect(optionPhoto2).toBeVisible();
        
            // Vérifier que l'option Indice est présente
            const optionIndice2 = await createProfilFixture2.getOptionIndice();
            await expect(optionIndice2).toBeVisible();
        
            // Vérifier que l'option Disparaitre est présente
            const optionDisparaitre2 = await createProfilFixture2.getOptionDisparaitre();
            await expect(optionDisparaitre2).toBeVisible();
        
            // Vérifier que l'option Reposer est présente
            const optionReposer2 = await createProfilFixture2.getOptionReposer();
            await expect(optionReposer2).toBeVisible();
        
            // Vérifier que l'option Temps est présente
            const optionTemps2 = await createProfilFixture2.getOptionTemps();
            await expect(optionTemps2).toBeVisible();
        
            // Vérifier que l'option Taille est présente
            const optionTaille2 = await createProfilFixture2.getOptionTaille();
            await expect(optionTaille2).toBeVisible();

            //Retourner à la page listProfil
            await createProfilFixture2.clickRetourButton();

        });

    await test.step('Afficher profil', async () => {

        // Cliquer sur le bouton Afficher
        const afficherLeProfil = await listProfilFixture2.afficherLeProfil();
        await afficherLeProfil.click();
    
        // Jouer depuis le profil
        const jouerButton = await listProfilFixture2.getJouerButton();
        await jouerButton.click();
    
    });

});

});
