import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ListProfilFixture extends E2EComponentFixture {

    getAddProfilButton() {
        return this.page.getByRole('button', { name: 'Ajouter un profil' });
    }

    async clickAddProfilButton() {
        const button = await this.getAddProfilButton();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
    }
    
    getSearchBarPatient() {
        return this.page.getByPlaceholder('Rechercher un patient');
    }

    getSearchBarStaff() {
        return this.page.getByPlaceholder('Rechercher un soignant');
    }

    supprimerLeProfil( nom: string, prenom: string) {
        return this.page.getByRole('button', { name: 'Supprimer' }).first();
    }

    async clickSupprimerLeProfil( nom: string, prenom: string) {
        return this.supprimerLeProfil(nom, prenom).click();
    }

    editerLeProfil( nom: string, prenom: string) {
        return this.page.getByRole('button', { name: 'Modifier' }).first();
    }

    async clickEditerLeProfil( nom: string, prenom: string) {
        return this.editerLeProfil(nom, prenom).click();
    }

    afficherLeProfil( nom: string, prenom: string) {
        return this.page.getByRole('button', { name: 'Afficher' }).first();
    }

    async clickAfficherLeProfil( nom: string, prenom: string) {
        return this.afficherLeProfil(nom, prenom).click();
    }

    getFermerProfilButton() {
        return this.page.getByRole('button', { name: 'Fermer' });
    }

    async clickFermerProfilButton() {
        const button = await this.getFermerProfilButton();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
    }

}