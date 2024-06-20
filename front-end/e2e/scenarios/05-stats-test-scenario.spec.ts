import { test, expect } from '@playwright/test';
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { StatsFixture } from 'src/app/stats/stats.fixture';
import { StatsQuizFixture } from 'src/app/stats/statsQuiz/statsQuiz.fixture';
import { StatsPatientFixture } from 'src/app/stats/statsPatient/statsPatient.fixture';

// https://playwright.dev/docs/locators
test.describe('Stats page feature', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    expect(page.url()).toBe(testUrl + '/home');
    const homeFixture = new HomeFixture(page);
    
    await test.step('Bouton de retour fonctionnel', async () => {
      const statsFixture = new StatsFixture(page);
      await homeFixture.clickStatsButton();//On se rend sur la page des stats
      expect(page.url()).toBe(testUrl + '/home/stats');
      await statsFixture.clickReturnButton();//On reviens sur le menu principal pour vérifier que le bouton fonctionne bien
      expect(page.url()).toBe(testUrl + '/home');
      await homeFixture.clickStatsButton();
      expect(page.url()).toBe(testUrl + '/home/stats');
    });

    await test.step('Première vérification des statistiques globales', async () => {
      const statsGlobales = page.locator('app-stats-globales');

      const gNbPatients = statsGlobales.getByText('Nombre de patients : 3');
      const gNbDifQuiz = statsGlobales.getByText('Nombre de quiz différents : 5');
      const gNbQuizDone = statsGlobales.getByText('Nombre de quiz réalisés au total : 2');

      //On vérifie que les stats globales correspondent bien à ce qu'elles sont senssées être
      expect(gNbPatients).toBeVisible();
      expect(gNbDifQuiz).toBeVisible();
      expect(gNbQuizDone).toBeVisible();
    });

    await test.step('Première vérification des statistiques par patient', async () => {
      const statsPatient = page.locator('app-stats-patient');

      const pTitle = statsPatient.getByText('Statistiques du patient : ');
      const pSelector = statsPatient.getByRole('combobox');
      let pName = statsPatient.getByText('Nom du patient : ');
      let pOption = statsPatient.getByText('Option du patient : ');
      let pNbQuizDone = statsPatient.getByText('Nombre de quiz réalisés : 0');
      let pMeanScore = statsPatient.getByText('Score moyen : 0');

      //On vérifie que les stats sont bien nulles si aucun patient n'est sélectionné
      expect(pTitle).toBeVisible();
      expect(pSelector).toBeVisible();
      expect(pName).toBeVisible();
      expect(pOption).toBeVisible();
      expect(pNbQuizDone).toBeVisible();
      expect(pMeanScore).toBeVisible();

      //On sélectionne un des patients
      await pSelector.click();
      await pSelector.selectOption('Bois, Maurice');
      pName = statsPatient.getByText('Nom du patient : Maurice');
      pOption = statsPatient.getByText('Option du patient : Indice');
      
      //On vérifie que les stats correspondent bien
      expect(pName).toBeVisible();
      expect(pOption).toBeVisible();
      expect(pNbQuizDone).toBeVisible();
      expect(pMeanScore).toBeVisible();
    });

    await test.step('Première vérification des statistiques par quiz', async () => {
      const statsQuiz = page.locator('app-stats-quiz');

      const qTitle = statsQuiz.getByText('Statistiques par quiz : ');
      const qSelector = statsQuiz.getByRole('combobox');
      let qPlayedTime = statsQuiz.getByText('Nombre de fois joué : 0');
      let qMeanScore = statsQuiz.getByText('Score moyen : 0/0');
      let qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : 0");
      let qNbQuestions = statsQuiz.getByText('Nombre de questions : 0');

      //On vérifie que les stats correspondent bien
      expect(qTitle).toBeVisible();
      expect(qSelector).toBeVisible();
      expect(qPlayedTime).toBeVisible();
      expect(qMeanScore).toBeVisible();
      expect(qMeanHintUsed).toBeVisible();
      expect(qNbQuestions).toBeVisible();
      
      //On vérifie que les valeurs obtenues correspondent bien au quiz choisi
      await qSelector.click();
      await qSelector.selectOption('Instruments');
      qPlayedTime = statsQuiz.getByText('Nombre de fois joué : 0');
      qMeanScore = statsQuiz.getByText('Score moyen : 0/2');
      qNbQuestions = statsQuiz.getByText('Nombre de questions : 2');

      expect(qPlayedTime).toBeVisible();
      expect(qMeanScore).toBeVisible();
      expect(qNbQuestions).toBeVisible();
    });

    await test.step('Routing des stats patient vers la liste des profils', async () => {
      const statsPatientFixture = new StatsPatientFixture(page);
      const buttonToListProfils = statsPatientFixture.getRouteToProfil();

      //On vérifie le bouton pour passer d'es stats d'un patient à son profil
      expect(page.url()).toBe(testUrl + '/home/stats');
      await buttonToListProfils.click();
      expect(page.url()).toBe(testUrl + '/home/listProfil');
      await page.goto(testUrl + '/home/stats');
    });

    await test.step('Routing des stats quiz vers la modification de ce quiz', async () => {
      const statsQuiz = page.locator('app-stats-quiz');
      const statsQuizFixture = new StatsQuizFixture(page);
      const buttonToEditQuiz = statsQuizFixture.getRouteToQuiz();

      //On vérifie le bouton pour passer d'un quiz à son menu d'édition
      const qSelector = statsQuiz.getByRole('combobox');
      await qSelector.click();
      await qSelector.selectOption('Politiciens en Guerre Froide');

      expect(page.url()).toBe(testUrl + '/home/stats');
      await buttonToEditQuiz.click();
      expect(page.url()).toBe(testUrl + '/home/gestionQuiz/editQuiz/Politiciens%20en%20Guerre%20Froide');
    });
  });
  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});