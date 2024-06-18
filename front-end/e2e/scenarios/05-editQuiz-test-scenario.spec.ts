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
        //On recupère le champ d'ajout de thème et on y écrit le thème Musique
        const inputTheme = await quizGestionFixture.getInputTheme();
        await inputTheme.fill('Musique');
        expect(inputTheme).toHaveValue('Musique');

        //On ajout le thème b
        await quizGestionFixture.clickAddThemeButton();
        //On récupère le champ d'ajout de nom de quiz et on y écrit le titre Instruments
        const inputTitle = await quizGestionFixture.getInputTitle();
        await inputTitle.fill('Instruments');
        expect(inputTitle).toHaveValue('Instruments');

        //On récupère le champ de selection des thème et on choisi le thème Musique
        const selectTheme = await quizGestionFixture.getSelectTheme();
        await selectTheme.click
        await selectTheme.selectOption('Musique');

        //On ajoute le nouveau quiz
        await quizGestionFixture.clickAddQuizButton();

        //await quizGestionFixture.clickReturnButton();

        await quizGestionFixture.clickEditButton('Instruments');
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

        //On vérifie que tout les éléments sont visibles
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

        //On ajoute le titre de la question
        await expect(question).toHaveValue('');
        await question.fill('La guitare est :');
        expect(question).toHaveValue('La guitare est :');

        //On ajoute la première réponse
        await expect(answer1).toHaveValue('');
        await answer1.fill('Les bois');
        expect(answer1).toHaveValue('Les bois');

        //On ajoute la deuxième réponse
        await expect(answer2).toHaveValue('');
        await answer2.fill('Un instrument a corde');
        expect(answer2).toHaveValue('Un instrument a corde');

        //On ajoute la troisième réponse
        await expect(answer3).toHaveValue('');
        await answer3.fill('Les cuivres');
        expect(answer3).toHaveValue('Les cuivres');

        //On ajoute la quatrième réponse
        await expect(answer4).toHaveValue('');
        await answer4.fill('Les percussions');
        expect(answer4).toHaveValue('Les percussions');

        //On marque la troisième réponse comme juste
        await answerValidity3.click();

        //On ajoute la question terminée
        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(0);
        await quizEditionFixture.clickAddQuestionButton();
        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(1);
    });

    await test.step("Modification d'une question", async () => {
        var title: string = 'Question La guitare est : Ré'
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

        //On vérifie que tout les éléments sont visibles
        expect(question).toBeVisible();
        expect(answer1).toBeVisible();
        expect(answer2).toBeVisible();
        expect(answer3).toBeVisible();
        expect(answer4).toBeVisible();
        expect(answerValidity1).toBeVisible();
        expect(answerValidity2).toBeVisible();
        expect(answerValidity3).toBeVisible();
        expect(answerValidity4).toBeVisible();
        expect(hint1).toBeVisible();
        expect(hint2).toBeVisible();
        expect(hint3).toBeVisible();
    
        //On change le titre de la question
        title = "Question À quel famille d'instrument appartient la guitare ?";
        await expect(question).toHaveValue("La guitare est :");
        await question.fill("À quel famille d'instrument appartient la guitare ?");
        expect(question).toHaveValue("À quel famille d'instrument appartient la guitare ?");

        //On vérifie que les éléments ont la bonne valeur 
        expect(answer1).toHaveValue('Les bois');
        expect(answer3).toHaveValue('Les cuivres');
        expect(answer4).toHaveValue('Les percussions');

        //On corrige la réponse
        await expect(answer2).toHaveValue('Un instrument a corde');
        await answer2.fill('Les cordes');
        expect(answer2).toHaveValue('Les cordes');

        //On change quelle réponse est la bonne
        await answerValidity2.check();

        //On ajoute un premier indice
        await hint1.fill("Elle n'est pas en métal");
        expect(hint1).toHaveValue("Elle n'est pas en métal");

        //On ajoute un deuxième indice
        await hint2.fill("Ce n'est pas un instrument à vent");
        expect(hint2).toHaveValue("Ce n'est pas un instrument à vent");

        //On valide les changements
        await quizEditionFixture.clickEditQuestionButton(title)
    });

    await test.step("Modification des valeur globales du quiz", async () => {
        const quiz = quizEditionFixture.getQuizTitle();
        const theme = quizEditionFixture.getThemeSelector();

        //On verifie que tous les éléments sont visibles
        expect(quiz).toBeVisible();
        expect(theme).toBeVisible();

        //ON modifie le titre du quiz
        await expect(quiz).toHaveValue('Instruments');
        await quiz.fill('Instruments de musique');
        expect(quiz).toHaveValue('Instruments de musique');

        //On change le thème du quiz
        await theme.click();
        await theme.selectOption('Cuisine');
    });

    await test.step("Suppression d'une question", async () => {
        const numberQuestion = quizEditionFixture.getNumberListQuestion();

        //On supprime la question
        //expect(numberQuestion).toEqual(1);
        await quizEditionFixture.clickSupprQuestionButton("Question À quel famille d'instrument appartient la guitare ?");
        //expect(numberQuestion).toEqual(1);

        //On supprime le quiz pour ne pas poluer la base de donnée
        await quizGestionFixture.clickReturnButton();

        await quizGestionFixture.clickSuppressButton('Instruments');
    });
  });
});