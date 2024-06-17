import { test, expect } from '@playwright/test';
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { StatsFixture } from 'src/app/stats/stats.fixture';
import { StatsQuizFixture } from 'src/app/stats/statsQuiz/statsQuiz.fixture';
import { StatsPatientFixture } from 'src/app/stats/statsPatient/statsPatient.fixture';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    const homeFixture = new HomeFixture(page);
    // Se déplacer dans la page stats et vérifier l'URL
    const buttonStats = await homeFixture.getStatsButton();
    await buttonStats.click();
    expect(page.url()).toBe(testUrl + "/home/stats");
    const statsFixture = new StatsFixture(page);

    await test.step('Sélectionner un patient dans les stats', async () => {
        const statsPatient = page.locator('app-stats-patient');
        const statsPatientFixture = new StatsPatientFixture(page);

        // Statistiques patient
        let pSelector = statsFixture.getSelectPatient();
        let pName = statsPatient.getByText("Nom du patient : ")
        let pOption = statsPatient.getByText("Option du patient : ");
        let pNbQuizDone = statsPatient.getByText("Nombre de quiz réalisés : ");
        let pMeanScore = statsPatient.getByText("Score moyen : ");
        let pChart = page.locator('#patientChart'); 

        expect(pName).toBeVisible();
        expect(pOption).toBeVisible();
        expect(pNbQuizDone).toBeVisible();
        expect(pMeanScore).toBeVisible();
        expect(pChart).not.toBeVisible();

        await pSelector.click();
        await pSelector.selectOption('Bois, Maurice');

        pName = statsPatient.getByText("Nom du patient : Maurice");
        pOption = statsPatient.getByText("Option du patient : " + statsPatientFixture.getOptions('Bois, Maurice'));
        pNbQuizDone = statsPatient.getByText("Nombre de quiz réalisés : " + statsPatientFixture.getNbQuizDone('Bois, Maurice'));
        pMeanScore = statsPatient.getByText("Score moyen : " + statsPatientFixture.getMeanScore('Bois, Maurice'));
        pChart = page.locator('#patientChart');

        expect(pName).toBeVisible();
        expect(pOption).toBeVisible();
        expect(pNbQuizDone).toBeVisible();
        expect(pMeanScore).toBeVisible();
        expect(pChart).toBeVisible();
    })

    await test.step('Sélectionner un quiz dans les stats', async () => {
        // Statistiques quiz vide
        const statsQuiz = page.locator('app-stats-quiz');
        const statsQuizFixture = new StatsQuizFixture(page);

        let qPlayedTime = statsQuiz.getByText("Nombre de fois joué : " + statsQuizFixture.getPlayedTime(''));
        let qMeanScore = statsQuiz.getByText("Score moyen : " + statsQuizFixture.getMeanScore(''));
        let qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : " + statsQuizFixture.getMeanHintUsed(''));
        let qNbQuestions = statsQuiz.getByText("Nombre de questions : " + statsQuizFixture.getNbQuestions(''));
        let qChart = page.locator('#quizChart');
        let qRouteQuiz = statsQuizFixture.getRouteToQuiz();

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
        qRouteQuiz = statsQuizFixture.getRouteToQuiz();

        expect(qPlayedTime).toBeVisible();
        expect(qMeanScore).toBeVisible();
        expect(qMeanHintUsed).toBeVisible();
        expect(qNbQuestions).toBeVisible();
        expect(qChart).toBeVisible();
        expect(qRouteQuiz).toBeVisible();

        // Test du routing vers la gestion de quiz
        await qRouteQuiz.click();
        expect(page.url()).toBe(testUrl + "/home/gestionQuiz/editQuiz/Calcul%20mental");
    })    
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});