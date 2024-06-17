import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreateProfilFixture extends E2EComponentFixture {
    getNomInput() {
        return this.page.locator('#infomationGenerales #nom')
    }

    getPrenomInput() {
        return this.page.locator('#infomationGenerales #prenom')
    }

    getRoleInput() {
        return this.page.locator('#infomationGenerales #role')
    }

    getJourInput() {
        return this.page.getByRole('combobox', { name: 'Jour' });
    }

    getMoisInput() {
        return this.page.getByRole('combobox', { name: 'Mois' });
    }

    getAnneeInput() {
        return this.page.getByLabel('Année :');
    }

    getOptionPhoto() {
        return this.page.getByLabel('Quiz contenant des photos :');
    }

    getOptionIndice() {
        return this.page.getByLabel('Peut utiliser des indices :');
    }

    getOptionDisparaitre() {
        return this.page.getByLabel('Faire disparaitre les mauvaises réponses sélectionnées :');
    }

    getOptionReposer(){
        return this.page.getByLabel('Repose les questions ratées plus tard :');
    }

    getOptionTemps(){
        return this.page.getByLabel('Temps d\'affichage de la bonne réponse :')
    }

    getOptionTaille(){
        return this.page.getByRole('combobox', { name: 'Taille du texte : Exemple' })
    }

    getAjouterLeProfil() {
        return this.page.getByRole('button', { name: 'Ajouter le profil' });
    }

    async clickAjouterLeProfil() {
        const button = await this.getAjouterLeProfil();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
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
