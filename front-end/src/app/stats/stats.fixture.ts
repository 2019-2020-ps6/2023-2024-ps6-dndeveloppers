import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatsFixture extends E2EComponentFixture {
  getReturnButton() {
   return this.page.getByRole('button', { name: 'Retour page principale' });
  }

  clickReturnButton() {
    return this.getReturnButton().click();
  }

  getSelectPatient() {
    return this.page.locator('app-stats-patient').getByRole('combobox');
  }

  getSelectQuiz() {
    return this.page.locator('app-stats-quiz').getByRole('combobox');
  }
}