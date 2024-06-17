import { test, expect } from '@playwright/test';
import { CreateQuizFixture } from 'src/app/quizGestion/createQuiz/createQuiz.fixture';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl + "/home/gestionQuiz");
    const createQuizFixture = new CreateQuizFixture(page);
    // Using locators functions:
    // Using page element role: see the function declaration
    
    // Search by text content. Partial and exact text.
    const buttonAddQuiz = await createQuizFixture.getAjoutQuizButton();
    const buttonAddTheme = await createQuizFixture.getAjoutThemeButton();

    expect(buttonAddQuiz).toBeVisible();
    expect(buttonAddTheme).toBeVisible();

    //On recupère le champ d'ajout de thème et on y écrit le thème b
    const inputTheme = await createQuizFixture.getInputTheme();
    await inputTheme.fill('b');
    expect(inputTheme).toHaveValue('b');

    //On ajout le thème b
    await createQuizFixture.clickAjoutThemeButton();

    //On récupère le champ d'ajout de nom de quiz et on y écrit le titre a
    const inputTitle = await createQuizFixture.getInputTitle();
    await inputTitle.fill('a');
    expect(inputTitle).toHaveValue('a');

    //On récupère le champ de selection des thème et on choisi le thème b
    const selectTheme = await createQuizFixture.getSelectTheme();
    await selectTheme.click
    await selectTheme.selectOption('b');

    //On ajoute le nouveau quiz
    await createQuizFixture.clickAjoutQuizButton();

    //await homeFixture.clickPlayButton();
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});