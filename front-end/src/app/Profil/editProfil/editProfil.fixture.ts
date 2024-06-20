import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class EditProfilFixture extends E2EComponentFixture {

    getNomInput() {
        return this.page.locator('#infomationGenerales #nom');
    }

    getPrenomInput() {
        return this.page.locator('#infomationGenerales #prenom');
    }

    getRoleInput() {
        return this.page.locator('#infomationGenerales #role');
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
        return this.page.getByLabel('Temps d\'affichage de la bonne réponse :');
    }

    getOptionTaille(){
        return this.page.getByRole('combobox', { name: 'Taille du texte : Exemple' });
    }

    getModifierLeProfil() {
        return this.page.getByRole('button', { name: 'Modifier le profil' });
    }

    async clickModifierLeProfil() {
        const button = await this.getModifierLeProfil();
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
    }
}