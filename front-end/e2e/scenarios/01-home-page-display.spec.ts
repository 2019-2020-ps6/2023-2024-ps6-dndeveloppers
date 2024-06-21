import { test, expect } from '@playwright/test';
import { HomeFixture } from 'src/app/home/home.fixture';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

// https://playwright.dev/docs/locators
test.describe('Home page display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    const homeFixture = new HomeFixture(page);
    // Using locators functions:
    // Using page element role: see the function declaration
    
    // Search by text content. Partial and exact text.
    await test.step("Visibilité des éléments", async () => {
      const buttonPlay = await homeFixture.getPlayButton();
      const buttonQuiz = await homeFixture.getQuizButton();
      const buttonProfil = await homeFixture.getProfilButton();
      const buttonStats = await homeFixture.getStatsButton();

      //On vérifie que tous les éléments sont bien affichés
      expect(buttonPlay).toBeVisible();
      expect(buttonQuiz).toBeVisible();
      expect(buttonProfil).toBeVisible();
      expect(buttonStats).toBeVisible();
    });

    await test.step("Test jouer Quiz, barre de recherche et selection de profil", async () => {
      await homeFixture.clickPlayButton();
      let numberOfProfil = await homeFixture.getNumberProfilShown();
      //On vérifie que les profils sont bien affichés
      expect(numberOfProfil).toBe(4);

      const inputQuiz = await homeFixture.getSearchBar();
      await expect(inputQuiz).toBeEmpty();
      await inputQuiz.fill('Delmas');//On test la saisie dans la barre de recherche
      await expect(inputQuiz).toHaveValue('Delmas');
      numberOfProfil = await homeFixture.getNumberProfilShown();
      expect(numberOfProfil).toBe(1);//On vérifie que seul le profil recherché est affiché

      //On test le routage vers la page des quiz
      await homeFixture.getPlayableProfil('Nom : Delmas').click();
      expect(page.url()).toBe(testUrl + '/home/listQuiz');

      //On revient au menu home
      await page.keyboard.type('admin');
    });

    await test.step("Test bouton de gestion des quiz", async () => {
      //On test le routage vers la page de gestion des quiz
      await homeFixture.clickQuizButton();
      expect(page.url()).toBe(testUrl + '/home/gestionQuiz');

      //On revient au menu home
      await homeFixture.clickReturnButton();
    });

    await test.step("Test bouton de gestion des profils", async () => {
      //On vérifie le routage vers la page de gestion des profils
      await homeFixture.clickProfilButton();
      expect(page.url()).toBe(testUrl + '/home/listProfil');

      //On revient au menu home
      await homeFixture.clickReturnButton();
    });

    await test.step("Test bouton des statistiques", async () => {
      //On vérifie le routage vers la page des statistiques
      await homeFixture.clickStatsButton();
      expect(page.url()).toBe(testUrl + '/home/stats');

      //On revient au menu home
      await homeFixture.clickReturnButton();
    })
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});