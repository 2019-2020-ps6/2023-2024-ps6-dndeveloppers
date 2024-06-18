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

    supprimerLeProfil() {
        return this.page.getByRole('heading', { name: 'Nom : ROQUES Prénom: Maxence Afficher Modifier Supprimer' }).getByRole('button', { name: 'Supprimer' })
    }

    editerLeProfil() {
        return this.page.getByRole('heading', { name: 'Nom : Heilmann Prénom: Hugo Afficher Modifier Supprimer' }).getByRole('button', { name: 'Modifier' })
    }

    afficherLeProfil() {
        return this.page.getByRole('heading', { name: 'Nom : TestAffichage Prénom: TestAffichage Afficher Modifier Supprimer' }).getByRole('button', { name: 'Afficher' })
    }

    getFermerProfilButton() {
        return this.page.getByRole('button', { name: 'Fermer' });
    }

    async clickFermerProfilButton() {
        const button = await this.getFermerProfilButton();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
    }

    getJouerButton() {
        return this.page.getByRole('button', { name: 'Jouer' });
    }

    
}