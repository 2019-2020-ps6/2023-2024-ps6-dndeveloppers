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

            await listQuizFixture.getSearchBar().fill("Politiciens en Guerre Froide");
            await page.locator('choixquiz').filter({ hasText: 'Politiciens en Guerre Froide' }).locator('#nom').click();
        });

        await test.step('Jouer quiz', async() => {
            const quizFixture = new QuizFixture(page);
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();

            // Verifier qu'il n'y a que 3 reponses affichées
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await page.getByRole('button', { name: 'John F. Kennedy' }).click();  

            await page.getByRole('button', { name: 'Valéry Giscard d\'Estaing' }).click();
            await page.getByRole('button', { name: 'Georges Pompidou' }).click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            await quizFixture.getIndiceBouton().click();
            expect(await quizFixture.countNbAnswer()).toBe(2);

            await page.getByRole('button', { name: 'François Mitterrand' }).click();

            // Vérifier que le message de fin de quiz s'affiche
            expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 2 questions lors de').isVisible());
            expect(await page.getByText('Félicitation, vous avez terminé le quiz !Vous avez répondu à 2 questions lors de gneugneugneu').isHidden())

            await page.locator('#endPopup').getByRole('button', { name: 'Retour page des quiz' }).click();
        });

        await test.step("Reprise d'un quiz abandonné en cours", async () => {
            await page.locator('choixquiz').filter({ hasText: 'Calcul Mental' }).locator('#nom').click();

            const quizFixture = new QuizFixture(page);

            expect(await page.getByText('5 * 7').isVisible());
            await page.getByRole('button', { name: '35' }).click();
            expect(await page.getByText('11 * 11').isVisible());

            await quizFixture.getReturnButton().click();

            await page.locator('choixquiz').filter({ hasText: 'Calcul Mental' }).locator('#nom').click();
            await quizFixture.getGetBackButton().click();

            expect(await page.getByText('11 * 11').isVisible());
            await page.getByRole('button', { name: '120' }).click();
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await quizFixture.getReturnButton().click();

            await page.locator('choixquiz').filter({ hasText: 'Calcul Mental' }).locator('#nom').click();
            await quizFixture.getGetBackButton().click();
            expect(await page.getByText('11 * 11').isVisible());
            expect(await quizFixture.countNbAnswer()).toBe(3);

            await page.getByRole('button', { name: '121' }).click();
            expect(await page.getByText('83 - 14').isVisible());

            await quizFixture.getReturnButton().click();

            await page.locator('choixquiz').filter({ hasText: 'Calcul Mental' }).locator('#nom').click();
            await quizFixture.getStartOverButton().click();
            expect(await page.getByText('83 - 14').isHidden());
            expect(await page.getByText('5 * 7').isVisible());
            
            await quizFixture.getReturnButton().click();
            // Ecrire dans le vide admin
            await page.keyboard.type('admin');
        });
    });
});