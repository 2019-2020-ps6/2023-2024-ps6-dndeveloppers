import { test, expect } from '@playwright/test';
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { StatsFixture } from 'src/app/stats/stats.fixture';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    const homeFixture = new HomeFixture(page);
    
    // Se déplacer dans la page stats et vérifier l'URL
    const buttonStats = await homeFixture.getStatsButton();
    await buttonStats.click();
    expect(page.url()).toBe("http://localhost:4200/home/stats");

    // Vérifier la présence du header
    const title = await page.getByText('Décrypter & Découvrir');
    const profilLastName = await page.getByText('Nom :');
    const profilFirstName = await page.getByText('Prénom :');
    const profilRole = await page.getByText('Rôle :');

    expect(title).toBeVisible();
    /* Pour une raison obscure je ne parviens pas à récupérer les éléments du profil
    expect(profilLastName).toBeVisible();
    expect(profilFirstName).toBeVisible();
    expect(profilRole).toBeVisible(); */

    // Vérifier la présence du bouton de retour
    const statsFixture = new StatsFixture(page);
    const returnButton = await statsFixture.getReturnButton();
    expect(returnButton).toBeVisible();

    // Statistiques globales
    const statsGlobales = page.locator('app-stats-globales');
    const statsGlobalesTitle = statsGlobales.getByText("Statistiques globales : ");
    const nbPatient = statsGlobales.getByText("Nombre de patients : ");
    const nbDifQuiz = statsGlobales.getByText("Nombre de quiz différents : ");
    const nbDoneQuiz = statsGlobales.getByText("Nombre de quiz réalisés au total : ");

    expect(statsGlobalesTitle).toBeVisible();
    expect(nbPatient).toBeVisible();
    expect(nbDifQuiz).toBeVisible();
    expect(nbDoneQuiz).toBeVisible();

    // Statistiques patient
    const statsPatient = page.locator('app-stats-patient');
    const pStatsPatientTitle = statsPatient.getByText("Statistiques du patient");
    const pSelector = statsFixture.getSelectPatient();
    const pName = statsPatient.getByText("Nom du patient : ")
    const pOption = statsPatient.getByText("Option du patient : ");
    const pNbQuizDone = statsPatient.getByText("Nombre de quiz réalisés : ");
    const pMeanScore = statsPatient.getByText("Score moyen : ");
    const pChart = page.locator('#patientChart'); 

    expect(pStatsPatientTitle).toBeVisible();
    expect(pSelector).toBeVisible();
    expect(pName).toBeVisible();
    expect(pOption).toBeVisible();
    expect(pNbQuizDone).toBeVisible();
    expect(pMeanScore).toBeVisible();
    expect(pChart).not.toBeVisible();

    // Statistiques quiz
    const statsQuiz = page.locator('app-stats-quiz');
    const qStatsQuizTitle = statsQuiz.getByText("Statistiques par quiz : ");
    const qSelector = statsFixture.getSelectQuiz();
    const qPlayedTime = statsQuiz.getByText("Nombre de fois joué : ");
    const qMeanScore = statsQuiz.getByText("Score moyen : ");
    const qMeanHintUsed = statsQuiz.getByText("Nombre moyen d'indices utilisés : ");
    const qNbQuestions = statsQuiz.getByText("Nombre de questions : ");
    const qChart = page.locator('#quizChart');
    const qRouteQuiz = statsFixture.getRouteToQuiz();

    expect(qStatsQuizTitle).toBeVisible();
    expect(qSelector).toBeVisible();
    expect(qPlayedTime).toBeVisible();
    expect(qMeanScore).toBeVisible();
    expect(qMeanHintUsed).toBeVisible();
    expect(qNbQuestions).toBeVisible();
    expect(qChart).not.toBeVisible();
    expect(qRouteQuiz).not.toBeVisible();
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});