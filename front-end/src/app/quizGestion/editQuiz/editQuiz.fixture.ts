import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class EditQuizFixture extends E2EComponentFixture {
  getReturnButton() {
   return this.page.getByRole('button', { name: 'Retour' })
  }

  clickReturnButton() {
    return this.getReturnButton().click();
  }
}