import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizEditionFixture extends E2EComponentFixture {

    //Éléments relatifs à l'ajout de question

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
        return this.page.getByTestId('theme')
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
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('label');
    }

    getEditAnswer1(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('q1');
    }

    getEditAnswerValidity1(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('rr1');
    }

    getEditAnswer2(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('q2');
    }

    getEditAnswerValidity2(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('rr2');
    }

    getEditAnswer3(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('q3');
    }

    getEditAnswerValidity3(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('rr3');
    }

    getEditAnswer4(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('q4');
    }

    getEditAnswerValidity4(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('rr4');
    }

    getEditHint1(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('i1');
    }

    getEditHint2(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('i2');
    }

    getEditHint3(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('i3');
    }

    getEditQuestionButton(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('editQuestion');
    }

    getSupprQuestionButton(questionName: string) {
        return this.page.locator('app-editquestion div').filter({ hasText: 'Question La guitare est : Ré' }).getByTestId('deleteQuestion');
    }

    clickEditQuestionButton(questionName: string) {
        return this.getEditQuestionButton(questionName).click();
    }

    clickSupprQuestionButton(questionName: string) {
        return this.getSupprQuestionButton(questionName).click();
    }
}