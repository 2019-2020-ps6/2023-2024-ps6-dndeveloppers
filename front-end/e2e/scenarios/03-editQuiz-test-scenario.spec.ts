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
        const addThemeButton = await quizGestionFixture.getAddThemeButton();
        expect(addThemeButton).toBeDisabled();
        await inputTheme.fill('Musique');
        expect(inputTheme).toHaveValue('Musique');
        expect(addThemeButton).not.toBeDisabled();

        //On ajout le thème musique
        await addThemeButton.click();
        expect(addThemeButton).toBeDisabled();
        //On récupère le champ d'ajout de nom de quiz et on y écrit le titre Instruments
        const inputTitle = await quizGestionFixture.getInputTitle();
        const addQuizButton = await quizGestionFixture.getAddQuizButton();
        expect(addQuizButton).toBeDisabled();
        await inputTitle.fill('Instruments');
        expect(inputTitle).toHaveValue('Instruments');
        expect(addQuizButton).toBeDisabled();

        //On récupère le champ de selection des thème et on choisi le thème Musique
        const selectTheme = await quizGestionFixture.getSelectTheme();
        await selectTheme.click();
        await selectTheme.selectOption('Musique');
        expect(addQuizButton).not.toBeDisabled();

        //On ajoute le nouveau quiz
        await quizGestionFixture.clickAddQuizButton();
        expect(addQuizButton).toBeDisabled();

        // On va pour modifier le nouveau quiz
        await quizGestionFixture.clickEditButton('Instruments');
    });

    await test.step("Ajout d'un question", async () => {
        const question = await quizEditionFixture.getQuestion();
        const answer1 = await quizEditionFixture.getAnswer(1);
        const answer2 = await quizEditionFixture.getAnswer(2);
        const answer3 = await quizEditionFixture.getAnswer(3);
        const answer4 = await quizEditionFixture.getAnswer(4);
        const answerValidity1 = await quizEditionFixture.getAnswerValidity(1);
        const answerValidity2 = await quizEditionFixture.getAnswerValidity(2);
        const answerValidity3 = await quizEditionFixture.getAnswerValidity(3);
        const answerValidity4 = await quizEditionFixture.getAnswerValidity(4);
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
        expect(addQuestionButton).toBeDisabled();

        //On ajoute le titre de la question
        await expect(question).toHaveValue('');
        await question.fill('La guitare est :');
        expect(question).toHaveValue('La guitare est :');
        expect(addQuestionButton).toBeDisabled();

        //On ajoute la première réponse
        await expect(answer1).toHaveValue('');
        await answer1.fill('Les bois');
        expect(answer1).toHaveValue('Les bois');
        expect(addQuestionButton).toBeDisabled();

        //On ajoute la deuxième réponse
        await expect(answer2).toHaveValue('');
        await answer2.fill('Un instrument a corde');
        expect(answer2).toHaveValue('Un instrument a corde');
        expect(addQuestionButton).toBeDisabled();

        //On ajoute la troisième réponse
        await expect(answer3).toHaveValue('');
        await answer3.fill('Les cuivres');
        expect(answer3).toHaveValue('Les cuivres');
        expect(addQuestionButton).toBeDisabled();

        //On ajoute la quatrième réponse
        await expect(answer4).toHaveValue('');
        await answer4.fill('Les percussions');
        expect(answer4).toHaveValue('Les percussions');
        expect(addQuestionButton).not.toBeDisabled();

        //On marque la troisième réponse comme juste
        await answerValidity3.click();

        //On ajoute la question terminée
        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(0);
        await quizEditionFixture.clickAddQuestionButton();
        expect(addQuestionButton).toBeDisabled();
        //expect(quizEditionFixture.getNumberListQuestion()).toEqual(1);
    });

    await test.step("Modification d'une question", async () => {
        var title: string = 'Question La guitare est : Ré'
        const question = await quizEditionFixture.getEditQuestionTitle(title);
        const answer1 = await quizEditionFixture.getEditAnswer(title,1);
        const answer2 = await quizEditionFixture.getEditAnswer(title,2);
        const answer3 = await quizEditionFixture.getEditAnswer(title,3);
        const answer4 = await quizEditionFixture.getEditAnswer(title,4);
        const answerValidity1 = await quizEditionFixture.getEditAnswerValidity(title,1);
        const answerValidity2 = await quizEditionFixture.getEditAnswerValidity(title,2);
        const answerValidity3 = await quizEditionFixture.getEditAnswerValidity(title,3);
        const answerValidity4 = await quizEditionFixture.getEditAnswerValidity(title,4);
        const hint1 = await quizEditionFixture.getEditHint(title,1);
        const hint2 = await quizEditionFixture.getEditHint(title,2);
        const hint3 = await quizEditionFixture.getEditHint(title,3);
        const editButton = await quizEditionFixture.getEditQuestionButton(title);

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
        expect(editButton).not.toBeDisabled();
    
        //On change le titre de la question
        title = "Question À quel famille d'instrument appartient la guitare ?";
        await expect(question).toHaveValue("La guitare est :");
        await question.fill('');
        expect(editButton).toBeDisabled();
        await question.fill("À quel famille d'instrument appartient la guitare ?");
        expect(question).toHaveValue("À quel famille d'instrument appartient la guitare ?");
        expect(editButton).not.toBeDisabled();

        //On vérifie que les éléments ont la bonne valeur 
        expect(answer1).toHaveValue('Les bois');
        expect(answer3).toHaveValue('Les cuivres');
        expect(answer4).toHaveValue('Les percussions');

        //On corrige la réponse
        await expect(answer2).toHaveValue('Un instrument a corde');
        await answer2.fill('');
        expect(editButton).toBeDisabled();
        await answer2.fill('Les cordes');
        expect(answer2).toHaveValue('Les cordes');
        expect(editButton).not.toBeDisabled();

        //On change quelle réponse est la bonne
        await answerValidity2.check();

        //On ajoute un premier indice
        await hint1.fill("Elle n'est pas en métal");
        expect(hint1).toHaveValue("Elle n'est pas en métal");

        //On ajoute un deuxième indice
        await hint2.fill("Ce n'est pas un instrument à vent");
        expect(hint2).toHaveValue("Ce n'est pas un instrument à vent");

        //On valide les changements
        await editButton.click();
    });

    await test.step("Modification des valeur globales du quiz", async () => {
        const title = quizEditionFixture.getQuizTitle();
        const themeSelector = quizEditionFixture.getThemeSelector();
        const editButton = quizEditionFixture.getEditGlobalButton();
        const theme = quizEditionFixture.getTheme();

        //On verifie que tous les éléments sont visibles
        expect(title).toBeVisible();
        expect(themeSelector).toBeVisible();

        //On modifie le titre du quiz
        expect(editButton).not.toBeDisabled();
        await expect(title).toHaveValue('Instruments');
        await title.fill('');
        expect(editButton).toBeDisabled();
        await title.fill('Instruments de musique');
        expect(title).toHaveValue('Instruments de musique');
        expect(editButton).not.toBeDisabled();

        //On change le thème du quiz
        await themeSelector.click();
        await themeSelector.selectOption('Cuisine');

        await quizEditionFixture.clickEditGlobalButton();

        await title.fill('Instruments');
        await theme.fill('Musique');
        await quizEditionFixture.clickAddThemeButton();
        await themeSelector.click();
        await themeSelector.selectOption('Musique');
        await quizEditionFixture.clickEditGlobalButton();
    });

    await test.step("Suppression d'une question", async () => {
        var title: string = 'Question La guitare est : Ré';
        const numberQuestion = quizEditionFixture.getNumberListQuestion();
        const supprButton = quizEditionFixture.getSupprQuestionButton(title);

        //On supprime la question
        //expect(numberQuestion).toEqual(1);
        await supprButton.click();
        //expect(numberQuestion).toEqual(1);
    });

    await test.step("Création de quiz pour les prochains tests", async () => {
        const question = await quizEditionFixture.getQuestion();
        const answer1 = await quizEditionFixture.getAnswer(1);
        const answer2 = await quizEditionFixture.getAnswer(2);
        const answer3 = await quizEditionFixture.getAnswer(3);
        const answer4 = await quizEditionFixture.getAnswer(4);
        const answerValidity1 = await quizEditionFixture.getAnswerValidity(1);
        const answerValidity2 = await quizEditionFixture.getAnswerValidity(2);
        const answerValidity3 = await quizEditionFixture.getAnswerValidity(3);
        const answerValidity4 = await quizEditionFixture.getAnswerValidity(4);
        const hint1 = await quizEditionFixture.getHint(1);
        const hint2 = await quizEditionFixture.getHint(2);
        const hint3 = await quizEditionFixture.getHint(3);

        await question.fill("À quel famille d'instrument appartient la guitare ?");
        await answer1.fill('Les bois');
        await answer2.fill('Les cordes');
        await answer3.fill('Les cuivres');
        await answer4.fill('Les percussions');
        await answerValidity2.click();
        await hint1.fill("Elle n'est pas en métal");
        await hint2.fill("Ce n'est pas un instrument à vent");
        await hint3.fill("On frotte les cordes pour créer du son");
        await quizEditionFixture.clickAddQuestionButton();

        await question.fill("Lequel de ces instruments n'est pas un cuivre ?");
        await answer1.fill('Tuba');
        await answer2.fill('Cor');
        await answer3.fill('Trompette');
        await answer4.fill('Clarinette');
        await answerValidity4.click();
        await hint1.fill("Cet instrument est de couleur noire");
        await quizEditionFixture.clickAddQuestionButton();

        await quizGestionFixture.clickReturnButton();

        const inputTitle = await quizGestionFixture.getInputTitle();
        const selectTheme = await quizGestionFixture.getSelectTheme();

        await inputTitle.fill('Tempo');
        await selectTheme.selectOption('Musique');
        await quizGestionFixture.clickAddQuizButton();
        await quizGestionFixture.clickEditButton('Tempo');

        await question.fill("À combien de temps correspond une blanche ♪ ?");
        await answer1.fill('1');
        await answer2.fill('4');
        await answer3.fill('2');
        await answer4.fill('0.5');
        await answerValidity3.click();
        await quizEditionFixture.clickAddQuestionButton();

        await question.fill("À combien de temps correspond une noire ♪ ?");
        await answer1.fill('2');
        await answer2.fill('0.5');
        await answer3.fill('4');
        await answer4.fill('1');
        await answerValidity4.click();
        await quizEditionFixture.clickAddQuestionButton();

        await question.fill("À combien de temps correspond une ronde ♪ ?");
        await answer1.fill('4');
        await answer2.fill('1');
        await answer3.fill('0.5');
        await answer4.fill('2');
        await answerValidity1.click();
        await quizEditionFixture.clickAddQuestionButton();
    });
  });
});