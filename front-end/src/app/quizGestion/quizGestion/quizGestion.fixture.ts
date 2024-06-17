import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizGestionFixture extends E2EComponentFixture {
  // Create Quiz + Add Theme
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

  // Search Quiz 
  getSearchBar() {
    return this.page.getByTestId('searchBar');
  }

  getSearchButton() {
    return this.page.getByTestId('searchBarTheme');
  }

  getNumberListQuiz(){
    const selector = `app-viewQuiz`;
    return this.page.locator(selector).count();
  }


}