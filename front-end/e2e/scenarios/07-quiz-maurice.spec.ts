import { test, expect } from '@playwright/test'; 
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { ListQuizFixture } from 'src/app/listQuiz/listQuiz.fixture';
import { QuizFixture } from 'src/app/quiz/quiz/quiz.fixture';



test.describe('Jouer quiz en tant que Maurice', () => {

    test('Jouer un quiz avec indice/skip bouton/reposer question', async ({ page }) => {
    await test.step('Choisir profil', async () => {
        await page.goto(testUrl + "/home");
        const homeFixture = new HomeFixture(page);
        
        await homeFixture.clickPlayButton();
        await homeFixture.getSearchBar().type("Maurice");
        await page.getByRole('heading', { name: 'Nom : Bois Prénom: Maurice' }).click();
    });

    await test.step('Choisir quiz', async () => {
        const listQuizFixture = new ListQuizFixture(page);

        //On lance un quiz
        await listQuizFixture.getSearchBar().fill("Tempo");
        await page.locator('choixquiz #nom').click();
    });

    await test.step('Jouer quiz', async() => {
        const quizFixture = new QuizFixture(page);
        await quizFixture.getSkipButton().click();

        await page.getByRole('button', { name: '0.5' }).click(); 
        await page.getByRole('button', { name: '4' }).click();
        await page.getByRole('button', { name: '1' }).click(); 

        // Vérifier que le message de fin de quiz s'affiche
        expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 3Félicitation, vous avez terminé le quiz !Vous avez répondu à 3 questions lors de ce quizVouz avez eu 2 bonnes réponses.Incroyable : vous n\'avez eu besoin d\'aucun indice questions lors de').isVisible());
        expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 2 questions lors de gneugneugneu').isHidden())

        await page.locator('#endPopup').getByRole('button', { name: 'Retour page des quiz' }).click();

        // Ecrire dans le vide admin
        await page.keyboard.type('admin');
    });
});
});