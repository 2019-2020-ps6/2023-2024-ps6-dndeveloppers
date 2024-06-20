import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreateThemeFixture extends E2EComponentFixture {

  getAjoutThemeButton() {
    return this.page.getByRole('button', { name: 'Ajouter le thème' });
  }

  getInputTheme() {
    const selector = `app-addTheme input[id="theme"]`;
    return this.page.getByPlaceholder(selector); 
  }

  clickAjoutThemeButton() {
    return this.getAjoutThemeButton().click();
  }
}