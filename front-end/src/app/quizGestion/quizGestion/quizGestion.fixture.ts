import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Page, Locator } from '@playwright/test';


export class QuizGestionFixture extends E2EComponentFixture {
  // Create Quiz + Add Theme
   getAddQuizButton() {
    return this.page.getByRole('button', { name: 'Ajouter le Quiz' });
   }

   getAddThemeButton() {
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

  clickAddQuizButton() {
    return this.getAddQuizButton().click();
  }

  clickAddThemeButton() {
    return this.getAddThemeButton().click();
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
    return this.page.getByTestId('quiz').count();
  }

  getEditButton(quizName: string){
    return this.page.getByRole('heading', {name: quizName}).getByRole('button', { name: 'Modifier' });
  }

  getSuppressButton(quizName: string) {
    return this.page.getByRole('heading', {name: quizName}).getByRole('button', {name: 'Supprimer'});
  }

  clickEditButton(quizName: string) {
    return this.getEditButton(quizName).click();
  }

  clickSuppressButton(quizName: string){
    return this.getSuppressButton(quizName).click();
  }

  getReturnButton() {
    return this.page.getByText('Retour');
  }

  clickReturnButton() {
    return this.getReturnButton().click();
  }

}