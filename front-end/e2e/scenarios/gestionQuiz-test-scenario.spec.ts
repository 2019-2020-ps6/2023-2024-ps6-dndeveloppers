import { test, expect } from '@playwright/test';
import { QuizGestionFixture } from 'src/app/quizGestion/quizGestion/quizGestion.fixture';

import { testUrl } from 'e2e/e2e.config';

test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl + "/home/gestionQuiz");
    const quizGestionFixture = new QuizGestionFixture(page);
    
    await test.step("Récupération des boutons", async () =>{
        const buttonAddQuiz = await quizGestionFixture.getAjoutQuizButton();
        const buttonAddTheme = await quizGestionFixture.getAjoutThemeButton();

        expect(buttonAddQuiz).toBeVisible();
        expect(buttonAddTheme).toBeVisible();
    });

    await test.step("Ajout d'un thème", async () =>{
        //On recupère le champ d'ajout de thème et on y écrit le thème b
        const inputTheme = await quizGestionFixture.getInputTheme();
        await inputTheme.fill('Politique');
        expect(inputTheme).toHaveValue('Politique');

        //On ajout le thème b
        await quizGestionFixture.clickAjoutThemeButton();
    });

    await test.step("Ajout du quiz", async () => {
        //On récupère le champ d'ajout de nom de quiz et on y écrit le titre a
        const inputTitle = await quizGestionFixture.getInputTitle();
        await inputTitle.fill('Politiciens durant la Guerre Froide');
        expect(inputTitle).toHaveValue('Politiciens durant la Guerre Froide');

        //On récupère le champ de selection des thème et on choisi le thème b
        const selectTheme = await quizGestionFixture.getSelectTheme();
        await selectTheme.click
        await selectTheme.selectOption('Politique');

        //On ajoute le nouveau quiz
        await quizGestionFixture.clickAjoutQuizButton();
    });

    await test.step("Recherche d'un quiz par nom", async () => {
      const inputSelect = await quizGestionFixture.getSearchBar();
      let numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      
      await inputSelect.fill('Guerre'); // On cherche un quiz qui existe
      expect(numberListQuiz).toEqual(1);
      await inputSelect.fill('Guerreeeee'); // On cherche un quiz qui n'existe pas
      numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(0);
      await inputSelect.fill('');
    });

    await test.step("Recherche d'un quiz par thème", async () => {
      // on ajoute un thème random
      const inputTheme = await quizGestionFixture.getInputTheme();
      await inputTheme.fill('Random');
      await quizGestionFixture.clickAjoutThemeButton();

      const searchSelectTheme = await quizGestionFixture.getSearchButton();
      await searchSelectTheme.click
      await searchSelectTheme.selectOption('Politique'); // On cherche un quiz qui existe avec ce thème

      let numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(1);
      await searchSelectTheme.click
      await searchSelectTheme.selectOption('Random'); // On cherche un quiz qui n'existe pas pour ce thème
      numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(0);
    });

  });
});