import { test, expect } from '@playwright/test';
import { QuizGestionFixture } from 'src/app/quizGestion/quizGestion/quizGestion.fixture';

import { testUrl } from 'e2e/e2e.config';

test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl + "/home/gestionQuiz");
    const quizGestionFixture = new QuizGestionFixture(page);
    
    await test.step("Récupération des boutons", async () =>{
        const buttonAddQuiz = await quizGestionFixture.getAddQuizButton();
        const buttonAddTheme = await quizGestionFixture.getAddThemeButton();

        //On vérifie que les éléments sont visibles
        expect(buttonAddQuiz).toBeVisible();
        expect(buttonAddTheme).toBeVisible();
    });

    await test.step("Ajout d'un thème", async () =>{
        const inputTheme = await quizGestionFixture.getInputTheme();
        const addButton = await quizGestionFixture.getAddThemeButton();

        //On recupère le champ d'ajout de thème et on y écrit le thème Jeux de cartes
        expect(inputTheme).toHaveValue('');
        expect(addButton).toBeDisabled();

        await inputTheme.fill('Jeux de cartes');
        expect(inputTheme).toHaveValue('Jeux de cartes');
        expect(addButton).not.toBeDisabled();

        //On ajoute le thème
        await addButton.click();
        expect(addButton).toBeDisabled();
    });

    await test.step("Ajout du quiz", async () => {
        const inputTitle = await quizGestionFixture.getInputTitle();
        const addButton = await quizGestionFixture.getAddQuizButton();

        //On récupère le champ d'ajout de nom de quiz et on y écrit le titre Rami
        expect(addButton).toBeDisabled();
        await inputTitle.fill('Rami');
        expect(inputTitle).toHaveValue('Rami');
        expect(addButton).toBeDisabled();

        //On récupère le champ de selection des thème et on choisi le thème
        const selectTheme = await quizGestionFixture.getSelectTheme();
        await selectTheme.click();
        await selectTheme.selectOption('Jeux de cartes');
        expect(addButton).not.toBeDisabled();

        //On ajoute le nouveau quiz
        await addButton.click();
        expect(addButton).toBeDisabled();
    });

    await test.step("Recherche d'un quiz par nom", async () => {
      const inputSelect = await quizGestionFixture.getSearchBar();
      let numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      
      await inputSelect.fill('Guerre'); // On cherche un quiz qui existe
      numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(1);
      await inputSelect.fill('Guerreeeee'); // On cherche un quiz qui n'existe pas
      numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(0);
      await inputSelect.fill('');
    });

    await test.step("Recherche d'un quiz par thème", async () => {
      const inputTheme = await quizGestionFixture.getInputTheme();
      const addThemeButton = await quizGestionFixture.getAddThemeButton();

      // on ajoute un thème random
      expect(addThemeButton).toBeDisabled();
      await inputTheme.fill('Random');
      expect(addThemeButton).not.toBeDisabled();
      await addThemeButton.click();
      expect(addThemeButton).toBeDisabled();

      const searchSelectTheme = await quizGestionFixture.getSearchButton();
      await searchSelectTheme.click()
      await searchSelectTheme.selectOption('Random'); // On cherche un quiz qui n'existe pas pour ce thème
      let numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(0);
      await searchSelectTheme.selectOption('Sélectionner un thème'); 
    });

    await test.step("Suppression d'un quiz", async () => {
      const inputSelect = await quizGestionFixture.getSearchBar();
      await inputSelect.fill('Rami');
      let numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(1);

      //On supprime le quiz
      await quizGestionFixture.clickSuppressButton('Rami');
      numberListQuiz = await quizGestionFixture.getNumberListQuiz();
      expect(numberListQuiz).toEqual(0);
    });
  });
});