import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizEditionFixture extends E2EComponentFixture {

    getQuestion() {
        return this.page.getByPlaceholder('Question');
    }

    getAnswer1() {
        return this.page.getByPlaceholder('Réponse 1');
    }

    getAnswerValidity1() {
        return this.page.getByTestId('r1');
    }

    getAnswer2() {
        return this.page.getByPlaceholder('Réponse 2');
    }

    getAnswerValidity2() {
        return this.page.getByTestId('r2');
    }

    getAnswer3() {
        return this.page.getByPlaceholder('Réponse 3');
    }

    getAnswerValidity3() {
        return this.page.getByTestId('r3');
    }

    getAnswer4() {
        return this.page.getByPlaceholder('Réponse 4');
    }

    getAnswerValidity4() {
        return this.page.getByTestId('r4');
    }

    getHint1() {
        return this.page.getByPlaceholder('Indice 1');
    }

    getHint2() {
        return this.page.getByPlaceholder('Indice 2');
    }

    getHint3() {
        return this.page.getByPlaceholder('Indice 3');
    }

    //getPictureButton() {
    //    return this.page.getByLabel('Photo :');
    //}
    //
    //clickPictureButton() {
    //    return this.getPictureButton().click();
    //}

    getQuestionIfPictureUnauthorised() {
        return this.page.getByTestId('photoTexte');
    }

    getAddQuestionButton() {
        return this.page.getByRole('button', { name: 'Ajouter la Question' });
    }

    clickAddQuestionButton() {
        return this.getAddQuestionButton().click();
    }

    getThemeSelector() {
        return this.page.getByRole('combobox');
    }

    getEditGlobalButton() {
        return this.page.getByRole('button', { name: 'Modifier' });
    }

    clickEditGlobalButton() {
        return this.getEditGlobalButton().click();
    }

    getTheme() {
        return this.page.getByTestId('theme')
    }

    getAddThemeButton() {
        return this.page.getByRole('button', { name: 'Ajouter le thème' });
    }

    clickAddThemeButton() {
        return this.getAddThemeButton().click();
    }

    getNumberListQuestion(){
        const selector = `app-editQuestion`;
        return this.page.locator(selector).count();
    }
}