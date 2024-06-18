import { test, expect } from '@playwright/test';
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { StatsFixture } from 'src/app/stats/stats.fixture';
import { StatsQuizFixture } from 'src/app/stats/statsQuiz/statsQuiz.fixture';
import { StatsPatientFixture } from 'src/app/stats/statsPatient/statsPatient.fixture';
import { ListProfilFixture } from 'src/app/Profil/listProfil/listProfil.fixture';
import { CreateProfilFixture } from 'src/app/Profil/createProfil/createProfil.fixture';
import { QuizGestionFixture } from 'src/app/quizGestion/quizGestion/quizGestion.fixture';

// https://playwright.dev/docs/locators
test.describe('Stats page feature', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    const homeFixture = new HomeFixture(page);
    // Se déplacer dans la page stats et vérifier l'URL
    const buttonStats = await homeFixture.getStatsButton();
    await buttonStats.click();
    expect(page.url()).toBe(testUrl + "/home/stats");
    const statsFixture = new StatsFixture(page);

    await test.step('Actualisation des stats globales', async () => {
      const statsGlobales = page.locator('app-stats-globales');
      /* Initialisation des stats globales */
      let nbPatient = statsGlobales.getByText("Nombre de patients : 0");
      const nbDifQuiz = statsGlobales.getByText("Nombre de quiz différents : 0");
      const nbDoneQuiz = statsGlobales.getByText("Nombre de quiz réalisés au total : 0");

      expect(nbPatient).toBeVisible();
      expect(nbDifQuiz).toBeVisible();
      expect(nbDoneQuiz).toBeVisible();

      /* On se déplace dans la gestion des profils */
      await statsFixture.clickReturnButton();
      expect(page.url()).toBe(testUrl + '/home');
      await homeFixture.clickProfilButton();
      expect(page.url()).toBe(testUrl + '/home/listProfil');

      /* On créé un profil */
      const listProfilFixture = new ListProfilFixture(page);
      listProfilFixture.clickAddProfilButton();

      const createProfilFixture = new CreateProfilFixture(page);
      const nomInput = await createProfilFixture.getNomInput();
      await nomInput.fill('Bois');
      const prenomInput = await createProfilFixture.getPrenomInput();
      await prenomInput.fill('Maurice');
      const roleInput = await createProfilFixture.getRoleInput();
      await roleInput.selectOption({ label: 'patient' });
      // Cocher l'option indice
      const optionIndice = await createProfilFixture.getOptionIndice();
      await optionIndice.check();

      await createProfilFixture.clickAjouterLeProfil();
      await listProfilFixture.getReturnButton().click();

      /* Aller constater les modifications stats */
      await homeFixture.clickStatsButton();

    });

    await test.step('Sélectionner un patient dans les stats', async () => {
        const statsPatient = page.locator('app-stats-patient');
        const statsPatientFixture = new StatsPatientFixture(page);

        // Statistiques patient
        let pSelector = await statsFixture.getSelectPatient();
        let pName = await statsPatient.getByText("Nom du patient : ")
        let pOption = await statsPatient.getByText("Option du patient : ");
        let pNbQuizDone = await statsPatient.getByText("Nombre de quiz réalisés : ");
        let pMeanScore = await statsPatient.getByText("Score moyen : ");
        let pChart = await page.locator('#patientChart'); 

        expect(pName).toBeVisible();
        expect(pOption).toBeVisible();
        expect(pNbQuizDone).toBeVisible();
        expect(pMeanScore).toBeVisible();
        expect(pChart).not.toBeVisible();

        await pSelector.click();
        await pSelector.selectOption('Bois, Maurice');

        pName = await statsPatient.getByText("Nom du patient : Maurice");
        pOption = await statsPatient.getByText("Option du patient : " + statsPatientFixture.getOptions('Bois, Maurice'));
        pNbQuizDone = await statsPatient.getByText("Nombre de quiz réalisés : " + statsPatientFixture.getNbQuizDone('Bois, Maurice'));
        pMeanScore = await statsPatient.getByText("Score moyen : " + statsPatientFixture.getMeanScore('Bois, Maurice'));
        pChart = await page.locator('#patientChart');

        expect(pName).toBeVisible();
        expect(pOption).toBeVisible();
        expect(pNbQuizDone).toBeVisible();
        expect(pMeanScore).toBeVisible();
        expect(pChart).toBeVisible();
    });

    await test.step('Créer le quiz Calcul mental', async () => {
      await statsFixture.clickReturnButton();
      await homeFixture.clickQuizButton();
      expect(page.url()).toBe(testUrl + '/home/gestionQuiz');

      const quizGestionFixture = new QuizGestionFixture(page);
      const inputTheme = await quizGestionFixture.getInputTheme();
      await inputTheme.fill('Mathématiques');
      expect(inputTheme).toHaveValue('Mathématiques');
      await quizGestionFixture.clickAddThemeButton();

      const inputTitle = await quizGestionFixture.getInputTitle();
      await inputTitle.fill('Calcul mental');
      expect(inputTitle).toHaveValue('Calcul mental');

      //On récupère le champ de selection des thème et on choisi le thème
      const selectTheme = await quizGestionFixture.getSelectTheme();
      await selectTheme.click();
      await selectTheme.selectOption('Mathématiques');

      //On ajoute le nouveau quiz
      await quizGestionFixture.clickAddQuizButton();

      await quizGestionFixture.clickReturnButton();
      await quizGestionFixture.clickReturnButton();
      await homeFixture.clickStatsButton();
    });

    await test.step('Sélectionner un quiz dans les stats', async () => {
      // Statistiques quiz vide
      const statsQuiz = page.locator('app-stats-quiz');
      const statsQuizFixture = new StatsQuizFixture(page);

      let qPlayedTime = await statsQuiz.getByText("Nombre de fois joué : " + statsQuizFixture.getPlayedTime(''));
      let qMeanScore = await statsQuiz.getByText("Score moyen : " + statsQuizFixture.getMeanScore(''));
      let qMeanHintUsed = await statsQuiz.getByText("Nombre moyen d'indices utilisés : " + statsQuizFixture.getMeanHintUsed(''));
      let qNbQuestions = await statsQuiz.getByText("Nombre de questions : " + statsQuizFixture.getNbQuestions(''));
      let qChart = await page.locator('#quizChart');
      const qRouteQuiz = await statsQuizFixture.getRouteToQuiz();

      expect(qPlayedTime).toBeVisible();
      expect(qMeanScore).toBeVisible();
      expect(qMeanHintUsed).toBeVisible();
      expect(qNbQuestions).toBeVisible();
      expect(qChart).toBeVisible();
      expect(qRouteQuiz).not.toBeVisible();
      
      // Statistiques quiz non vide
      const qSelector = statsFixture.getSelectQuiz();
      expect(qSelector).toBeVisible();
      await qSelector.click();
      await qSelector.selectOption('Calcul mental');

      qPlayedTime = statsQuiz.getByText("Nombre de fois joué : " + statsQuizFixture.getPlayedTime('Calcul mental'));
      qMeanScore = statsQuiz.getByText("Score moyen : " + statsQuizFixture.getMeanScore('Calcul mental'));
      qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : " + statsQuizFixture.getMeanHintUsed('Calcul mental'));
      qNbQuestions = statsQuiz.getByText("Nombre de questions : " + statsQuizFixture.getNbQuestions('Calcul mental'));
      qChart = page.locator('#quizChart');

      expect(qPlayedTime).toBeVisible();
      expect(qMeanScore).toBeVisible();
      expect(qMeanHintUsed).toBeVisible();
      expect(qNbQuestions).toBeVisible();
      expect(qChart).toBeVisible();
    });
    
    await test.step('Routing vers les profils', async () => {
      const statsQuizFixture = new StatsQuizFixture(page);

      const qRouteQuiz = statsQuizFixture.getRouteToQuiz();
      expect(qRouteQuiz).toBeVisible();
      await qRouteQuiz.click();
      expect(page.url()).toBe(testUrl + "/home/gestionQuiz/editQuiz/Calcul%20mental");
    })
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});