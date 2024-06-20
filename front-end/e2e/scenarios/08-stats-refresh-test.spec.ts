import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { HomeFixture } from 'src/app/home/home.fixture';
import { QuizGestionComponent } from 'src/app/quizGestion/quizGestion/quizGestion.component';
import { QuizGestionFixture } from 'src/app/quizGestion/quizGestion/quizGestion.fixture';

// https://playwright.dev/docs/locators
test.describe('Stats page refresh', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    expect(page.url()).toBe(testUrl + '/home');
    const homeFixture = new HomeFixture(page);
    const quizGestionFixture = new QuizGestionFixture(page);
    await homeFixture.clickStatsButton();
    expect(page.url()).toBe(testUrl + '/home/stats');

    await test.step('Actualisation des statistiques globales', async () => {
      const statsGlobales = page.locator('app-stats-globales');

      const gNbPatients = statsGlobales.getByText('Nombre de patients : 3');
      const gNbDifQuiz = statsGlobales.getByText('Nombre de quiz différents : 5');
      const gNbQuizDone = statsGlobales.getByText('Nombre de quiz réalisés au total : 4');

      expect(gNbPatients).toBeVisible();
      expect(gNbDifQuiz).toBeVisible();
      expect(gNbQuizDone).toBeVisible();
    });

    await test.step('Actualisation des statistiques du patient Maurice', async () => {
      const statsPatient = page.locator('app-stats-patient');

      const pTitle = statsPatient.getByText('Statistiques du patient : ');
      const pSelector = statsPatient.getByRole('combobox');
      let pName = statsPatient.getByText('Nom du patient : ,');
      let pOption = statsPatient.getByText('Option du patient : ');
      let pNbQuizDone = statsPatient.getByText('Nombre de quiz réalisés : 0');
      let pMeanScore = statsPatient.getByText('Score moyen : 0');

      expect(pTitle).toBeVisible();
      expect(pSelector).toBeVisible();
      expect(pName).toBeVisible();
      expect(pOption).toBeVisible();
      expect(pNbQuizDone).toBeVisible();
      expect(pMeanScore).toBeVisible();

      await pSelector.click();
      await pSelector.selectOption('Bois, Maurice');
      pName = statsPatient.getByText('Nom du patient : Bois, Maurice');
      pOption = statsPatient.getByText('Option du patient : Indice, Reposer');
      pNbQuizDone = statsPatient.getByText('Nombre de quiz réalisés : 1');
      pMeanScore = statsPatient.getByText('Score moyen : 66.67');
    
      expect(pName).toBeVisible();
      expect(pOption).toBeVisible();
      expect(pNbQuizDone).toBeVisible();
      expect(pMeanScore).toBeVisible();

      const pResQuiz = statsPatient.locator('.highcharts-point').first();
      const pResValue = statsPatient.locator('text').filter({ hasText: '66.67' });
      expect(pResQuiz).toBeVisible();
      expect(pResValue).toBeVisible();
    });

    await test.step('Actualisation des statistiques de la patiente Huguette', async () => {
        const statsPatient = page.locator('app-stats-patient');
        const pSelector = statsPatient.getByRole('combobox');

        await pSelector.click();
        await pSelector.selectOption('Dupont, Huguette');
        const pName = statsPatient.getByText('Nom du patient : Dupont, Huguette');
        const pOption = statsPatient.getByText('Option du patient : Indice, Photo, Supprimer');
        const pNbQuizDone = statsPatient.getByText('Nombre de quiz réalisés : 1');
        const pMeanScore = statsPatient.getByText('Score moyen : 16.67');
        
        expect(pName).toBeVisible();
        expect(pOption).toBeVisible();
        expect(pNbQuizDone).toBeVisible();
        expect(pMeanScore).toBeVisible();

        const pResQuiz = statsPatient.locator('.highcharts-point').first();
        const pResValue = statsPatient.locator('text').filter({ hasText: '16.67' });
        expect(pResQuiz).toBeVisible();
        expect(pResValue).toBeVisible();
    });

    await test.step('Actualisation des statistiques par quiz', async () => {
      const statsQuiz = page.locator('app-stats-quiz');

      const qTitle = statsQuiz.getByText('Statistiques par quiz : ');
      const qSelector = statsQuiz.getByRole('combobox');
      let qPlayedTime = statsQuiz.getByText('Nombre de fois joué : 0');
      let qMeanScore = statsQuiz.getByText('Score moyen : 0/0');
      let qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : 0");
      let qNbQuestions = statsQuiz.getByText('Nombre de questions : 0');

      expect(qTitle).toBeVisible();
      expect(qSelector).toBeVisible();
      expect(qPlayedTime).toBeVisible();
      expect(qMeanScore).toBeVisible();
      expect(qMeanHintUsed).toBeVisible();
      expect(qNbQuestions).toBeVisible();

      await qSelector.click();
      await qSelector.selectOption('Instruments');
      qPlayedTime = statsQuiz.getByText('Nombre de fois joué : 1');
      qMeanScore = statsQuiz.getByText('Score moyen : 0.17/2');
      qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : 7");
      qNbQuestions = statsQuiz.getByText('Nombre de questions : 2');

      await expect(qPlayedTime).toBeVisible();
      await expect(qMeanScore).toBeVisible();
      await expect(qMeanHintUsed).toBeVisible();
      await expect(qNbQuestions).toBeVisible();

      const qChart = await statsQuiz.locator('.highcharts-point');
      const qFirstPoint = await qChart.nth(0);
      const qSecondPoint = await qChart.nth(1);
    
      await expect(qFirstPoint).toBeVisible();
      await expect(qSecondPoint).toBeVisible();
    });
    await test.step("Nettoyage base de donnée", async () => {
      await page.goto(testUrl + '/home/gestionQuiz');
      const supprInstru = await quizGestionFixture.getSuppressButton('Instruments');
      const supprTempo = await quizGestionFixture.getSuppressButton('Tempo');
      await supprInstru.click();
      await supprTempo.click();
    });
  });
  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});