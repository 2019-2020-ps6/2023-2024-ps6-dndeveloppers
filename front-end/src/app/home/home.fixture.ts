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
    //return this.page.getByRole('text-Input', { placeholder: 'Rechercher un profil'});
    const selector = `input[class="searchBar"]`;
    return this.page.getByPlaceholder('Rechercher un profil'); 
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
}