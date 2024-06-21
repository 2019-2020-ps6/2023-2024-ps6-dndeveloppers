import { test, expect } from '@playwright/test'; 
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { ListQuizFixture } from 'src/app/listQuiz/listQuiz.fixture';
import { QuizFixture } from 'src/app/quiz/quiz/quiz.fixture';



test.describe('Jouer quiz en tant que Huguette', () => {

    test('Jouer un quiz avec indice/photo/disparaitre les reponses', async ({ page }) => {
        await test.step('Choisir profil', async () => {
            await page.goto(testUrl + "/home");
            const homeFixture = new HomeFixture(page);
        
            await homeFixture.clickPlayButton();
            await homeFixture.getSearchBar().type("Huguette");
            await page.getByRole('heading', { name: 'Nom : Dupont Prénom: Huguette' }).click();
        });

        await test.step('Choisir quiz', async () => {
            const listQuizFixture = new ListQuizFixture(page);

            await listQuizFixture.getSearchBar().type("Instruments");
            await page.locator('choixquiz').filter({ hasText: 'Instruments' }).locator('#nom').click();
        });

        await test.step('Jouer quiz', async() => {
            const quizFixture = new QuizFixture(page);
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();

            // Verifier qu'il n'y a que 3 reponses affichées
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await page.getByRole('button', { name: 'Les cordes' }).click();  

            await page.getByText("Lequel de ces instruments n'est pas un cuivre ?").isVisible();

            await page.getByRole('button', { name: 'Cor' }).click();
            await page.getByRole('button', { name: 'Tuba' }).click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await expect(quizFixture.getIndiceBouton()).not.toBeVisible();
            expect(await quizFixture.countNbAnswer()).toBe(2);

            await page.getByRole('button', { name: 'Clarinette' }).click();

            // Vérifier que le message de fin de quiz s'affiche
            expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 2 questions lors de ce quiz').isVisible());
            expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 2 questions lors de ce quizVouz avez eu 2 bonnes réponses.').isHidden())

            await page.locator('#endPopup').getByRole('button', { name: 'Retour page des quiz' }).click();
        });

        await test.step("Reprise d'un quiz abandonné en cours", async () => {
            await page.locator('choixquiz').filter({ hasText: 'Tempo' }).locator('#nom').click();

            const quizFixture = new QuizFixture(page);

            //On répond à une question pour que le quiz puisse être abandonné et repris
            expect(await page.getByText("À combien de temps correspond une blanche ♪ ?").isVisible());
            await page.getByRole('button', { name: '2' }).click();
            expect(await page.getByText("À combien de temps correspond une noire ♪ ?").isVisible());

            await quizFixture.getReturnButton().click();

            //On reprend le quiz la où on l'a laissé
            await page.locator('choixquiz').filter({ hasText: 'Tempo' }).locator('#nom').click();
            await quizFixture.getGetBackButton().click();
            expect(await page.getByText("À combien de temps correspond une noire ♪ ?").isVisible());

            //On se trompe pour voir si la mauvaise réponse enlevé le sera toujours si on abandonne le quiz puis qu'on y revient
            await page.getByRole('button', { name: '0.5' }).click();
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await quizFixture.getReturnButton().click();

            await page.locator('choixquiz').filter({ hasText: 'Tempo' }).locator('#nom').click();
            await quizFixture.getGetBackButton().click();
            expect(await page.getByText("À combien de temps correspond une noire ♪ ?").isVisible());
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await page.getByRole('button', { name: '1' }).click();
            expect(await page.getByText('À combien de temps correspond une ronde ♪ ?').isVisible());

            await quizFixture.getReturnButton().click();

            //On abandonne le quiz et on choisi de recommencer depuis le début
            await page.locator('choixquiz').filter({ hasText: 'Tempo' }).locator('#nom').click();
            await quizFixture.getStartOverButton().click();
            expect(await page.getByText('À combien de temps correspond une ronde ♪ ?').isHidden());
            expect(await page.getByText("À combien de temps correspond une blanche ♪ ?").isVisible());
            
            await quizFixture.getReturnButton().click();
            // Ecrire dans le vide admin
            await page.keyboard.type('admin');
        });
    });
});