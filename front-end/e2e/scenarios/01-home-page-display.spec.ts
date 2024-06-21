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
    const buttonPlay = await homeFixture.getPlayButton();
    const buttonQuiz = await homeFixture.getQuizButton();
    const buttonProfil = await homeFixture.getProfilButton();
    const buttonStats = await homeFixture.getStatsButton();

    expect(buttonPlay).toBeVisible();
    expect(buttonQuiz).toBeVisible();
    expect(buttonProfil).toBeVisible();
    expect(buttonStats).toBeVisible();

    await homeFixture.clickPlayButton();
    

    const inputQuiz = await homeFixture.getSearchBar();
    await expect(inputQuiz).toBeEmpty();
    //inputQuiz.focus();
    await inputQuiz.fill('a');
    await expect(inputQuiz).toHaveValue('a');
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});