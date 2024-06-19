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
        await page.getByRole('heading', { name: 'Politiciens en Guerre Froide' }).click();
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

        // Ecrire dans le vide admin
        await page.keyboard.type('admin');
    });
});
});