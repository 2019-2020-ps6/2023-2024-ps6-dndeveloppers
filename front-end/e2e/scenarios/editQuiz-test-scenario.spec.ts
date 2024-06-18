import { test, expect } from '@playwright/test';
import { QuizGestionFixture } from 'src/app/quizGestion/quizGestion/quizGestion.fixture';
import { QuizEditionFixture } from 'src/app/quizGestion/editQuiz/editQuiz.fixture';

import { testUrl } from 'e2e/e2e.config';

test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
     await page.goto(testUrl + "/home/gestionQuiz");
    const quizGestionFixture = new QuizGestionFixture(page);
    const quizEditionFixture = new QuizEditionFixture(page);

    await test.step("Ajout du quiz", async () => {
        //On recupère le champ d'ajout de thème et on y écrit le thème b
        const inputTheme = await quizGestionFixture.getInputTheme();
        await inputTheme.fill('Politique');
        expect(inputTheme).toHaveValue('Politique');

        //On ajout le thème b
        await quizGestionFixture.clickAjoutThemeButton();
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

        await quizGestionFixture.clickReturnButton();

        await quizGestionFixture.clickEditButton('Politiciens durant la Guerre Froide');
    });

    await test.step("Ajout d'un question", async () => {
        const question = await quizEditionFixture.getQuestion();
        const answer1 = await quizEditionFixture.getAnswer1();
        const answer2 = await quizEditionFixture.getAnswer2();
        const answer3 = await quizEditionFixture.getAnswer3();
        const answer4 = await quizEditionFixture.getAnswer4();
        const answerValidity1 = await quizEditionFixture.getAnswerValidity1();
        const answerValidity2 = await quizEditionFixture.getAnswerValidity2();
        const answerValidity3 = await quizEditionFixture.getAnswerValidity3();
        const answerValidity4 = await quizEditionFixture.getAnswerValidity4();
        const addQuestionButton = await quizEditionFixture.getAddQuestionButton();

        expect(question).toBeVisible();
        expect(answer1).toBeVisible();
        expect(answer2).toBeVisible();
        expect(answer3).toBeVisible();
        expect(answer4).toBeVisible();
        expect(answerValidity1).toBeVisible();
        expect(answerValidity2).toBeVisible();
        expect(answerValidity3).toBeVisible();
        expect(answerValidity4).toBeVisible();
        expect(addQuestionButton).toBeVisible();

        await expect(question).toHaveValue('');
        await question.fill('Quel président américain a été assassiné en 1960 ?');
        expect(question).toHaveValue('Quel président américain a été assassiné en 1960 ?');

        await expect(answer1).toHaveValue('');
        await answer1.fill('Bill Clinton');
        expect(answer1).toHaveValue('Bill Clinton');

        await expect(answer2).toHaveValue('');
        await answer2.fill('John K. Fennedy');
        expect(answer2).toHaveValue('John K. Fennedy');

        await expect(answer3).toHaveValue('');
        await answer3.fill('Harry Truman');
        expect(answer3).toHaveValue('Harry Truman');

        await expect(answer4).toHaveValue('');
        await answer4.fill('Henry Kissinger');
        expect(answer4).toHaveValue('Henry Kissinger');

        await answerValidity3.click();

        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(0);
        await quizEditionFixture.clickAddQuestionButton();
        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(1);
    });

    await test.step("Modification d'une question", async () => {
        var title: string = 'Quel président américain a été assassiné en 1960 ?'
        const question = await quizEditionFixture.getEditQuestionTitle(title);
        const answer1 = await quizEditionFixture.getEditAnswer1(title);
        const answer2 = await quizEditionFixture.getEditAnswer2(title);
        const answer3 = await quizEditionFixture.getEditAnswer3(title);
        const answer4 = await quizEditionFixture.getEditAnswer4(title);
        const answerValidity1 = await quizEditionFixture.getEditAnswerValidity1(title);
        const answerValidity2 = await quizEditionFixture.getEditAnswerValidity2(title);
        const answerValidity3 = await quizEditionFixture.getEditAnswerValidity3(title);
        const answerValidity4 = await quizEditionFixture.getEditAnswerValidity4(title);
        const hint1 = await quizEditionFixture.getEditHint1(title);
        const hint2 = await quizEditionFixture.getEditHint2(title);
        const hint3 = await quizEditionFixture.getEditHint3(title);
    
        title = 'Quel président américain a été assassiné en 1963 ?';
        await expect(question).toHaveValue('Quel président américain a été assassiné en 1960 ?');
        await question.fill('Quel président américain a été assassiné en 1963 ?');
        expect(question).toHaveValue('Quel président américain a été assassiné en 1963 ?');

        expect(answer1).toHaveValue('Bill Clinton');
        expect(answer3).toHaveValue('Harry Truman');
        expect(answer4).toHaveValue('Henry Kissinger');

        await expect(answer2).toHaveValue('John K. Fennedy');
        await answer2.fill('John F. Kennedy');
        expect(answer2).toHaveValue('John F. Kennedy');

        await answerValidity2.click();

        await hint1.fill("Lee Harvey Oswald est l'assassin");
        expect(hint1).toHaveValue("Lee Harvey Oswald est l'assassin");

        await hint2.fill("Il est mort dans sa voiture à Dallas");
        expect(hint2).toHaveValue("Il est mort dans sa voiture à Dallas");

        await hint3.fill("\"Ich bin ein Berliner\"");
        expect(hint3).toHaveValue("\"Ich bin ein Berliner\"");

        await quizEditionFixture.clickEditQuestionButton(title)
    });

    await test.step("Suppression d'une question", async () => {
        const numberQuestion = quizEditionFixture.getNumberListQuestion();

        //expect(numberQuestion).toEqual(1);
        await quizEditionFixture.clickSupprQuestionButton('Quel président américain a été assassiné en 1963 ?');
        //expect(numberQuestion).toEqual(1);

        await quizGestionFixture.clickReturnButton();

        await quizGestionFixture.clickSuppressButton('Politiciens durant la Guerre Froide');
    });
  });
});