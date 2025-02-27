import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class HomeFixture extends E2EComponentFixture {
  getPlayButton() {
   return this.page.getByRole('button', { name: 'JOUER A UN QUIZ' });
  }

  getQuizButton() {
    return this.page.getByRole('button', { name: 'GESTION DES QUIZ' });
   }

  getProfilButton() {
    return this.page.getByRole('button', { name: 'GESTION DES PROFILS' });
  }

  getStatsButton() {
    return this.page.getByRole('button', { name: 'STATISTIQUES' });
  }

  getSearchBar() {
    return this.page.getByPlaceholder('Rechercher un profil'); 
  }

  getPlayableProfil(profilName: string) {
    return this.page.getByRole('heading', { name: profilName });
  }

  getReturnButton() {
    return this.page.getByRole('button', { name: 'Retour page principale'});
  }

  getNumberProfilShown() {
    return this.page.locator('app-viewprofil').count();
  }

  clickPlayButton() {
    return this.getPlayButton().click();
  }

  clickQuizButton() {
    return this.getQuizButton().click();
  }

  clickProfilButton() {
    return this.getProfilButton().click();
  }

  clickStatsButton() {
    return this.getStatsButton().click();
  }

  clickReturnButton() {
    return this.getReturnButton().click();
  }
}