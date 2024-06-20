import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizEditionFixture extends E2EComponentFixture {

    //Éléments relatifs à l'ajout de question

    getQuestion() {
        return this.page.getByPlaceholder('Question');
    }

    getAnswer(number: number) {
        return this.page.getByPlaceholder('Réponse '+number);
    }

    getAnswerValidity(number: number) {
        return this.page.getByTestId('r'+number);
    }

    getHint(number: number) {
        return this.page.getByPlaceholder('Indice '+number);
    }

    getQuestionIfPictureUnauthorised() {
        return this.page.getByTestId('photoTexte');
    }

    getAddQuestionButton() {
        return this.page.getByRole('button', { name: 'Ajouter la Question' });
    }

    clickAddQuestionButton() {
        return this.getAddQuestionButton().click();
    }

    //Éléments relatifs aux valeurs globales du quiz

    getQuizTitle() {
        return this.page.getByTestId('nom');
    }

    getThemeSelector() {
        return this.page.getByRole('combobox');
    }

    getEditGlobalButton() {
        return this.page.getByTestId('editGlobal');
    }

    clickEditGlobalButton() {
        return this.getEditGlobalButton().click();
    }

    //Ajouteur de thème

    getTheme() {
        return this.page.getByTestId('theme');
    }

    getAddThemeButton() {
        return this.page.getByRole('button', { name: 'Ajouter le thème' });
    }

    clickAddThemeButton() {
        return this.getAddThemeButton().click();
    }

    //Éléments relatifs aux question déjà existantes

    getNumberListQuestion() {
        const selector = `app-editQuestion`;
        return this.page.locator(selector).count();
    }

    getEditQuestionTitle(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('label');
    }

    getEditAnswer(questionName: string, number: number) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('q'+number);
    }

    getEditAnswerValidity(questionName: string, number: number) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('rr'+number);
    }

    getEditHint(questionName: string, number: number) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('i'+number);
    }

    getEditQuestionButton(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('editQuestion');
    }

    getSupprQuestionButton(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: questionName }).getByTestId('deleteQuestion');
    }

    clickEditQuestionButton(questionName: string) {
        return this.getEditQuestionButton(questionName).click();
    }

    clickSupprQuestionButton(questionName: string) {
        return this.getSupprQuestionButton(questionName).click();
    }
}