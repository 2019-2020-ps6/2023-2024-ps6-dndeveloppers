import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreateQuizFixture extends E2EComponentFixture {
   getAjoutQuizButton() {
    return this.page.getByRole('button', { name: 'Ajouter le Quiz' });
   }

   getAjoutThemeButton() {
    return this.page.getByRole('button', { name: 'Ajouter le thème' });
   }

   getInputTitle() {
    return this.page.getByTestId('name');//Récupération de l'élément via le test id
   }

   getSelectTheme(){
    return this.page.getByTestId('themeSelector');
   }

   getInputTheme() {
    return this.page.getByTestId('theme'); 
   }

  clickAjoutQuizButton() {
    return this.getAjoutQuizButton().click();
  }

  clickAjoutThemeButton() {
    return this.getAjoutThemeButton().click();
  }
}