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

    getSupprimerLeProfil() {
        return this.page.getByRole('button', { name: 'Supprimer' }).nth(1)
    }

    async clickSupprimerLeProfil() {
        const button = await this.getSupprimerLeProfil();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
    }
}
